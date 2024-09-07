import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from 'jquery';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "./WriteTable.css";
import FormResponsable from '../Responsable/formResponsable'; // Asegúrate de importar el componente correcto

function WriteTable({ titles, data }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [buttonForm, setButtonForm] = useState('Enviar');
  const URI = "/api/responsable/"; // Cambia esto según la URL de tu API
  const moduleName = "Gestionar Responsables"; // Nombre del módulo

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(moduleName, doc.internal.pageSize.width / 2, 10, { align: "center" }); // Título del módulo centrado
    doc.autoTable({
      head: [titles],
      body: data,
      startY: 20, // Ajustar posición de la tabla para que no se sobreponga con el título
    });
    doc.save(`${moduleName.replace(/ /g, '_')}_data.pdf`);
  };

  const exportToExcel = () => {
    // Crear una hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(data.map(row => 
      titles.reduce((obj, title, index) => {
        obj[title] = row[index];
        return obj;
      }, {})
    ));

    // Añadir el nombre del módulo en la primera fila
    const headerRow = [moduleName];
    const ws_add = XLSX.utils.aoa_to_sheet([headerRow, ...XLSX.utils.sheet_to_json(ws, { header: 1 })]);
    
    // Ajustar el nombre de la hoja de cálculo
    ws_add["!rows"] = [{ hpx: 20 }, ...ws_add["!rows"] || []];
    ws_add["A1"].s = { font: { sz: 16, bold: true }, alignment: { horizontal: 'center' } };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws_add, "Sheet1");
    XLSX.writeFile(wb, `${moduleName.replace(/ /g, '_')}_data.xlsx`);
  };

  const exportToSQL = () => {
    const tableName = "data"; // Nombre de la tabla SQL
    const columns = titles.map(title => `\`${title}\``).join(", ");
    let sql = `-- ${moduleName}\n`; // Comentario con el nombre del módulo
    sql += `CREATE TABLE ${tableName} (${columns} TEXT);\n`;

    const values = data.map(row => {
      const formattedRow = row.map(value => 
        typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value
      ).join(", ");
      return `(${formattedRow})`;
    });

    sql += `INSERT INTO ${tableName} (${columns}) VALUES\n`;
    sql += values.join(",\n");
    sql += ";";

    // Crear un blob con el SQL
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${moduleName.replace(/ /g, '_')}_data.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (data.length > 0) {
      if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
        new DataTable("#TableDinamic", {
          responsive: true,
          lengthChange: false,
          pageLength: 10,
          language: {
            search: "", 
            searchPlaceholder: "Buscar...",
            emptyTable: "No hay datos disponibles en la tabla", 
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior"
            }
          }
        });
      }
    }
  }, [data]);

  return (
    <div className="container mt-4">
      {/* Contenedor de Botones */}
      <div className="d-flex align-items-center mb-3">
        {/* Botón para registrar */}
        <button
          className="btn btn-success text-white fw-bold me-2"
          onClick={handleOpenForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle text-white"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>{" "}
          Registrar
        </button>

        {/* Botones de exportación */}
        <div className="btn-group" role="group">
          <button className="btn" onClick={exportToPDF} title="Export PDF">
            <img 
              src="/pdf.png" 
              alt="Export PDF" 
              width="17" 
              height="20" 
              className="text-danger"
            />
          </button>
          <button className="btn" onClick={exportToExcel} title="Export EXCEL">
            <img 
              src="/excel.png" 
              alt="Export EXCEL" 
              width="17" 
              height="20" 
              className="text-success"
            />
          </button>
          <button className="btn" onClick={exportToSQL} title="Export SQL">
            <img 
              src="/sql.png" 
              alt="Export SQL" 
              width="17" 
              height="20" 
              className="text-secondary"
            />
          </button>
        </div>
      </div>

      {/* Tabla Dinámica */}
      <table className="table table-responsive" id="TableDinamic">
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th scope="col" key={index}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para el Formulario */}
      {isFormVisible && (
        <div className="modal fade show d-block" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar Responsable</h5>
                <button type="button" className="btn-close" onClick={handleCloseForm}></button>
              </div>
              <div className="modal-body">
                <FormResponsable
                  buttonForm={buttonForm}
                  responsable={formData}
                  URI={URI}
                  updateTextButton={setButtonForm}
                  setIsFormVisible={setIsFormVisible}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteTable;
