import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './WriteTable.css';

const WriteTable = ({ titles, data, moduleName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 5;
    const [hasRecords, setHasRecords] = useState(false);

    const filteredData = data.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setHasRecords(filteredData.length > 0);
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredData, currentPage, rowsPerPage]);

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const showNoRecordsAlert = () => {
        Swal.fire({
            icon: 'warning',
            title: 'No hay registros',
            text: 'No hay registros disponibles para exportar.',
        });
    };

    const excludeActionsColumn = (titlesArray, dataArray) => {
        const actionsIndex = titlesArray.indexOf('Acciones');
        if (actionsIndex > -1) {
            const newTitles = titlesArray.filter((_, index) => index !== actionsIndex);
            const newData = dataArray.map(row => row.filter((_, index) => index !== actionsIndex));
            return { newTitles, newData };
        }
        return { newTitles: titlesArray, newData: dataArray };
    };

    const exportToPDF = () => {
        if (!hasRecords) return showNoRecordsAlert();
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        const doc = new jsPDF();
        const title = moduleName ? moduleName.replace(/_/g, ' ') : 'Sin título';
        doc.text(title, doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
        doc.autoTable({ startY: 20, head: [newTitles], body: newData });
        doc.save(`${moduleName || 'default'}.pdf`);
    };

    const exportToExcel = () => {
        if (!hasRecords) return showNoRecordsAlert();
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        const ws = XLSX.utils.aoa_to_sheet([[moduleName.replace(/_/g, ' ')], [], newTitles, ...newData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${moduleName}.xlsx`);
    };

    const exportToSQL = () => {
        if (!hasRecords) return showNoRecordsAlert();
        const { newTitles, newData } = excludeActionsColumn(titles, filteredData);
        let sql = `-- Exportado desde: ${moduleName.replace(/_/g, ' ')}\n\nCREATE TABLE table_name (\n`;
        sql += newTitles.map(title => `  \`${title}\` VARCHAR(255)`).join(',\n') + '\n);\n\n';
        newData.forEach(row => {
            const values = row.map(value => `'${value}'`).join(', ');
            sql += `INSERT INTO table_name (${newTitles.map(t => `\`${t}\``).join(', ')}) VALUES (${values});\n`;
        });
        const blob = new Blob([sql], { type: 'text/sql' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${moduleName}.sql`;
        link.click();
    };

    const handlePageChange = (newPage) => setCurrentPage(newPage);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    <button
                        className={`action-button me-2 ${!hasRecords ? 'disabled' : ''}`}
                        onClick={exportToPDF}
                        disabled={!hasRecords}
                    >
                        <img src="/pdf.png" alt="Export to PDF" width="55px" />
                    </button>

                    <button
                        className={`action-button me-2 ${!hasRecords ? 'disabled' : ''}`}
                        onClick={exportToExcel}
                        disabled={!hasRecords}
                    >
                        <img src="/excel.png" alt="Export to Excel" width="75px" />
                    </button>

                    <button
                        className={`action-button me-2 ${!hasRecords ? 'disabled' : ''}`}
                        onClick={exportToSQL}
                        disabled={!hasRecords}
                    >
                        <img src="/sql.png" alt="Export to SQL" width="50px" />
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
                                {row.map((cell, idx) => <td key={idx}>{cell}</td>)}
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
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">{currentPage}</span>
                    </li>
                    <li className={`page-item ${currentPage * rowsPerPage >= filteredData.length ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * rowsPerPage >= filteredData.length}>Siguiente</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default WriteTable;