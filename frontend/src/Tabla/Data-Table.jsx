import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Importa los estilos de SweetAlert2
import './WriteTable.css'; // Importa el archivo CSS

const WriteTable = ({ titles, data, fileName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5; // Número de filas por página

    // Filtrar datos basado en el término de búsqueda
    const filteredData = data.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [hasRecords, setHasRecords] = useState(filteredData.length > 0);

    // Actualizar el estado de hasRecords cada vez que filteredData cambia
    useEffect(() => {
        setHasRecords(filteredData.length > 0);
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredData, currentPage, rowsPerPage]);

    // Depuración para verificar el valor de fileName
    useEffect(() => {
        console.log('Nombre del archivo:', fileName);
    }, [fileName]);

    // Calcular los datos a mostrar en la página actual
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Función para mostrar alerta de no hay registros
    const showNoRecordsAlert = () => {
        Swal.fire({
            icon: 'warning',
            title: 'No hay registros',
            text: 'No hay registros disponibles para exportar.',
        });
    };

    // Excluir la columna "Acciones" para exportaciones
    const excludeActionsColumn = (titlesArray, dataArray) => {
        const actionsIndex = titlesArray.indexOf('Acciones');
        if (actionsIndex > -1) {
            const newTitles = titlesArray.filter((_, index) => index !== actionsIndex);
            const newData = dataArray.map(row => row.filter((_, index) => index !== actionsIndex));
            return { newTitles, newData };
        }
        return { newTitles: titlesArray, newData: dataArray };
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        if (!hasRecords) {
            showNoRecordsAlert();
            return;
        }
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const title = `${fileName.replace(/_/g, ' ')}`;
        doc.text(title, pageWidth / 2, 10, { align: 'center' });
        doc.autoTable({
            startY: 20,
            head: [newTitles],
            body: newData,
        });
        doc.save(`${fileName}.pdf`);
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        if (!hasRecords) {
            showNoRecordsAlert();
            return;
        }
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        const titleRow = [fileName.replace(/_/g, ' ')];
        const ws = XLSX.utils.aoa_to_sheet([
            titleRow,
            [],
            newTitles,
            ...newData
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        if (!hasRecords) {
            showNoRecordsAlert();
            return;
        }
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        let sql = `-- Exportado desde: ${fileName.replace(/_/g, ' ')}\n\n`;
        sql += 'CREATE TABLE table_name (\n';
        sql += newTitles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n');
        sql += '\n);\n\n';

        newData.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${newTitles.map(title => `\`${title}\``).join(', ')}) VALUES (${values});\n`;
        });

        const blob = new Blob([sql], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.sql`;
        link.click();
    };

    // Función para manejar el cambio de página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    <button
                        className="action-button me-2"
                        onClick={exportToPDF}
                        disabled={!hasRecords}
                    >
                        <img src="/pdf.png" alt="Export to PDF" />
                    </button>
                    <button
                        className="action-button me-2"
                        onClick={exportToExcel}
                        disabled={!hasRecords}
                    >
                        <img src="/excel.png" alt="Export to Excel" />
                    </button>
                    <button
                        className="action-button me-2"
                        onClick={exportToSQL}
                        disabled={!hasRecords}
                    >
                        <img src="/sql.png" alt="Export to SQL" />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ width: '300px' }}
                />
            </div>
            <table className="table modern-table">
                <thead>
                    <tr>
                        {titles.map((title, index) => (
                            <th key={index} className={title === 'Acciones' ? 'actions-col' : ''}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, idx) => (
                                    <td key={idx}>{cell}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={titles.length} className="text-center">No hay registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">{currentPage}</span>
                    </li>
                    <li className={`page-item ${currentPage * rowsPerPage >= filteredData.length ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage * rowsPerPage < filteredData.length ? currentPage + 1 : currentPage)}
                            disabled={currentPage * rowsPerPage >= filteredData.length}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default WriteTable;
