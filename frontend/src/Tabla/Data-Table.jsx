import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const WriteTable = ({ titles, data, moduleName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5;

    const exportToPDF = () => {
        const filteredTitles = titles.slice(0, -1); // Filtrar los títulos
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1)); // Filtrar los datos
    
        const doc = new jsPDF();
    
        // Añadir el título centrado en la parte superior
        doc.setFontSize(20); // Tamaño de fuente para el título
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleWidth = doc.getTextWidth(moduleName);
        doc.text(moduleName, (pageWidth - titleWidth) / 2, 20);
    
        // Añadir la primera tabla (puedes ajustar el startY si es necesario)
        doc.autoTable({
            startY: 30, // Asegúrate de que esta posición esté debajo del título
            head: [filteredTitles],
            body: filteredDataToExport,
        });
    
        // Guardar el documento
        doc.save(`${moduleName}.pdf`); // Usar nombre del módulo
    };

    const exportToExcel = () => {
        const filteredTitles = titles.slice(0, -1);
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1));

        const ws = XLSX.utils.aoa_to_sheet([[moduleName], filteredTitles, ...filteredDataToExport]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${moduleName}.xlsx`); // Usar nombre del módulo
    };

    const exportToSQL = () => {
        const filteredTitles = titles.slice(0, -1);
        const filteredDataToExport = filteredData.map(row => row.slice(0, -1));

        let sql = `-- ${moduleName}\n\n`; // Añadir nombre del módulo como comentario
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
        link.download = `${moduleName}.sql`; // Usar nombre del módulo
        link.click();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(row =>
        row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={exportToPDF}>Exportar a PDF</button>
                <button className="btn btn-outline-success" onClick={exportToExcel}>Exportar a Excel</button>
                <button className="btn btn-outline-danger" onClick={exportToSQL}>Exportar a SQL</button>
            </div>

            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control mb-3"
                />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {titles.map((title, index) => (
                                <th key={index}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteTable;