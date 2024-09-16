import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const WriteTable = ({ titles, data, fileName = 'Gestionar Responsable' }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5; // Número de filas por página

    // Filtrar la última columna de los datos
    const filteredTitles = titles.slice(0, -1); // Ignorar la última columna de los títulos
    const filteredData = data.map(row => row.slice(0, -1)); // Ignorar la última columna de los datos

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const title = `${fileName}`; // Nombre del archivo como título
        doc.text(title, pageWidth / 2, 10, { align: 'center' }); // Centrar el título
        doc.autoTable({
            startY: 20,
            head: [filteredTitles],
            body: filteredData,
        });
        doc.save(`${fileName}.pdf`);
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        // Preparar el título como una fila de datos
        const titleRow = [fileName];
        // Crear una hoja de trabajo
        const ws = XLSX.utils.aoa_to_sheet([
            titleRow,        // Fila del título
            [],              // Fila vacía para separar el título de los encabezados
            filteredTitles,  // Encabezados de las columnas (sin la última)
            ...filteredData  // Datos (sin la última columna)
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sql = `-- Exportado desde: ${fileName}\n\n`; // Título en comentario SQL
        sql += 'CREATE TABLE table_name (\n';
        sql += filteredTitles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n');
        sql += '\n);\n\n';

        filteredData.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${filteredTitles.map(title => `\`${title}\``).join(', ')}) VALUES (${values});\n`;
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

    // Filtrar datos basado en el término de búsqueda
    const filteredSearchData = filteredData.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calcular los datos a mostrar en la página actual
    const paginatedData = filteredSearchData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToPDF}>
                        <img src="/pdf.png" alt="Export to PDF" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        Exportar a PDF
                    </button>
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToExcel}>
                        <img src="/excel.png" alt="Export to Excel" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        Exportar a Excel
                    </button>
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToSQL}>
                        <img src="/sql.png" alt="Export to SQL" style={{ width: '28px', height: '29px', marginRight: '8px' }} />
                        Exportar a SQL
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
                        {filteredTitles.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, idx) => (
                                <td key={idx}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                    </li>
                    <li className="page-item">
                        <span className="page-link">{currentPage}</span>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage * rowsPerPage < filteredSearchData.length ? currentPage + 1 : currentPage)}
                            disabled={currentPage * rowsPerPage >= filteredSearchData.length}
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
