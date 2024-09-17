import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const WriteTable = ({ titles, data, moduleName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5;

    // Filtrar los datos basados en el término de búsqueda
    const filteredData = data.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calcular el índice de las filas a mostrar en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const exportToPDF = () => {
        const filteredTitles = titles.slice(0, -1);
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1));

        const doc = new jsPDF();
        doc.setFontSize(20);
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleWidth = doc.getTextWidth(moduleName);
        doc.text(moduleName, (pageWidth - titleWidth) / 2, 20);

        doc.autoTable({
            startY: 30,
            head: [filteredTitles],
            body: filteredDataToExport,
        });

        doc.save(`${moduleName}.pdf`);
    };

    const exportToExcel = () => {
        const filteredTitles = titles.slice(0, -1);
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1));

        const ws = XLSX.utils.aoa_to_sheet([[moduleName], filteredTitles, ...filteredDataToExport]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${moduleName}.xlsx`);
    };

    const exportToSQL = () => {
        const filteredTitles = titles.slice(0, -1);
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1));

        let sql = `-- ${moduleName}\n\n`;
        sql += 'CREATE TABLE table_name (\n';
        sql += filteredTitles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n');
        sql += '\n);\n\n';

        filteredDataToExport.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${filteredTitles.map(title => `\`${title}\``).join(', ')}) VALUES (${values});\n`;
        });

        const blob = new Blob([sql], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${moduleName}.sql`;
        link.click();
    };

    // Control de la búsqueda
    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reiniciar la paginación al buscar
    };

    // Control de la paginación
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Número total de páginas
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div>
            {/* Botones de exportación */}
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-outline-primary" onClick={exportToPDF}>Exportar a PDF</button>
                <button className="btn btn-outline-success" onClick={exportToExcel}>Exportar a Excel</button>
                <button className="btn btn-outline-danger" onClick={exportToSQL}>Exportar a SQL</button>
            </div>

            {/* Campo de búsqueda */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Tabla de datos */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {titles.map((title, index) => (
                                <th key={index}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={titles.length} className="text-center">
                                    No hay registros para mostrar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Controles de paginación */}
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, pageIndex) => (
                        <li key={pageIndex} className={`page-item ${pageIndex + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(pageIndex + 1)}>
                                {pageIndex + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default WriteTable;