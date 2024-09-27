// WriteTable.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Importa los estilos de SweetAlert2

const WriteTable = ({ titles, data, fileName = 'Gestionar_Responsable' }) => {
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
        // Si la página actual excede el número de páginas disponibles, ajustar la página
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredData, currentPage, rowsPerPage]);

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

    // Función para exportar a PDF
    const exportToPDF = () => {
        if (!hasRecords) {
            showNoRecordsAlert();
            return;
        }
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const title = `${fileName}`;
        doc.text(title, pageWidth / 2, 10, { align: 'center' });
        doc.autoTable({
            startY: 20,
            head: [titles],
            body: filteredData,
        });
        doc.save(`${fileName}.pdf`);
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        if (!hasRecords) {
            showNoRecordsAlert();
            return;
        }
        const titleRow = [fileName];
        const ws = XLSX.utils.aoa_to_sheet([
            titleRow,
            [], // Fila vacía para separar el título de los encabezados
            titles,
            ...filteredData
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
        let sql = `-- Exportado desde: ${fileName}\n\n`;
        sql += 'CREATE TABLE table_name (\n';
        sql += titles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n');
        sql += '\n);\n\n';

        filteredData.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${titles.map(title => `\`${title}\``).join(', ')}) VALUES (${values});\n`;
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
        setCurrentPage(1); // Volver a la primera página al cambiar la búsqueda
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-light me-2 d-flex align-items-center"
                        onClick={exportToPDF}
                        disabled={!hasRecords}
                        style={{ cursor: hasRecords ? 'pointer' : 'not-allowed', opacity: hasRecords ? 1 : 0.5 }}
                    >
                        <img src="/pdf.png" alt="Export to PDF" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        
                    </button>
                    <button
                        className="btn btn-light me-2 d-flex align-items-center"
                        onClick={exportToExcel}
                        disabled={!hasRecords}
                        style={{ cursor: hasRecords ? 'pointer' : 'not-allowed', opacity: hasRecords ? 1 : 0.5 }}
                    >
                        <img src="/excel.png" alt="Export to Excel" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        
                    </button>
                    <button
                        className="btn btn-light me-2 d-flex align-items-center"
                        onClick={exportToSQL}
                        disabled={!hasRecords}
                        style={{ cursor: hasRecords ? 'pointer' : 'not-allowed', opacity: hasRecords ? 1 : 0.5 }}
                    >
                        <img src="/sql.png" alt="Export to SQL" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        
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
            <table className="table table-striped">
                <thead>
                    <tr>
                        {titles.map((title, index) => (
                            <th key={index}>{title}</th>
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
                            <td colSpan={titles.length} className="text-center">
                             
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Paginación */}
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
