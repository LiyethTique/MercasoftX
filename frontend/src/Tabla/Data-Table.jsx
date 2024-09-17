import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const WriteTable = ({ titles, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5; // Número de filas por página

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [titles],
            body: filteredData,
        });
        doc.save('Gestionar_Responsable.pdf');
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.aoa_to_sheet([titles, ...filteredData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'Gestionar_Responsable.xlsx');
    };

    // Función para exportar a SQL
    const exportToSQL = () => {
        let sql = 'CREATE TABLE table_name (\n';
        sql += titles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n');
        sql += '\n);\n\n';

        filteredData.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${titles.map(title => `\`${title}\``).join(', ')}) VALUES (${values});\n`;
        });

        const blob = new Blob([sql], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Gestionar_Responsable.sql';
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
    const filteredData = data.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calcular los datos a mostrar en la página actual
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToPDF}>
                        <img src="/pdf.png" alt="Export to PDF" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                      
                    </button>
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToExcel}>
                        <img src="/excel.png" alt="Export to Excel" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                       
                    </button>
                    <button className="btn btn-light me-2 d-flex align-items-center" onClick={exportToSQL}>
                        <img src="/sql.png" alt="Export to SQL" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        
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
