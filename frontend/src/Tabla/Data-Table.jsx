import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "./WriteTable.css";
import FormResponsable from "../Responsable/formResponsable";
import FormCliente from "../Cliente/formCliente"; // Ejemplo de otro formulario

function WriteTable({ titles, data, formComponent, moduleName }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [buttonForm, setButtonForm] = useState("Enviar");

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const text = moduleName || "Gestionar"; // Asegúrate de que siempre tenga un valor válido
    doc.setFontSize(16);

    const pageWidth = doc.internal.pageSize.width;
    const textX = pageWidth ? pageWidth / 2 : 105; // Establecer un valor predeterminado en caso de que el ancho no esté disponible

    doc.text(text, textX, 10, { align: "center" });

    // Filtrar las columnas a incluir en el PDF
    const filteredData = data.map(row => row.slice(0, -1)); // Excluye la última columna (Acciones)
    
    doc.autoTable({
        head: [titles.slice(0, -1)], // Excluye la columna "Acciones"
        body: filteredData,
        startY: 20,
    });

    doc.save(`${text.replace(/ /g, "_")}_data.pdf`);
  };

  const exportToExcel = () => {
    // Filtrar las columnas a incluir en el Excel
    const filteredData = data.map(row => row.slice(0, -1)); // Excluye la última columna (Acciones)

    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((row) =>
        titles.slice(0, -1).reduce((obj, title, index) => {
          obj[title] = row[index];
          return obj;
        }, {})
      )
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${moduleName.replace(/ /g, "_")}_data.xlsx`);
  };

  const exportToSQL = () => {
    const tableName = "data";
    const columns = titles.slice(0, -1).map((title) => `\`${title}\``).join(", "); // Excluye la columna "Acciones"
    let sql = `CREATE TABLE ${tableName} (${columns} TEXT);\n`;

    const values = data.map((row) => {
      const formattedRow = row
        .slice(0, -1) // Excluye la última columna (Acciones)
        .map((value) => (typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value))
        .join(", ");
      return `(${formattedRow})`;
    });

    sql += `INSERT INTO ${tableName} (${columns}) VALUES\n`;
    sql += values.join(",\n");
    sql += ";";

    const blob = new Blob([sql], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${moduleName.replace(/ /g, "_")}_data.sql`;
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
              previous: "Anterior",
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-success text-white fw-bold me-2" onClick={handleOpenForm}>
          Registrar
        </button>
        <div className="btn-group" role="group">
          <button className="btn" onClick={exportToPDF} title="Export PDF">
            <img src="/pdf.png" alt="Export PDF" width="17" height="20" className="text-danger" />
          </button>
          <button className="btn" onClick={exportToExcel} title="Export EXCEL">
            <img src="/excel.png" alt="Export EXCEL" width="17" height="20" className="text-success" />
          </button>
          <button className="btn" onClick={exportToSQL} title="Export SQL">
            <img src="/sql.png" alt="Export SQL" width="17" height="20" className="text-secondary" />
          </button>
        </div>
      </div>

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

      {isFormVisible && (
        <div className="modal fade show d-block" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar {moduleName}</h5>
                <button type="button" className="btn-close" onClick={handleCloseForm}></button>
              </div>
              <div className="modal-body">
                {React.createElement(formComponent, {
                  buttonForm: buttonForm,
                  formData: formData,
                  URI: "/categoria",
                  updateTextButton: setButtonForm,
                  setIsFormVisible: setIsFormVisible,
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteTable;