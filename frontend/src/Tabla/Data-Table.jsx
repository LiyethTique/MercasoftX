import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./WriteTable.css"; // Importa el archivo CSS
import $ from 'jquery';

function WriteTable({ titles, data }) {
  useEffect(() => {
    if (data.length > 0) { // Solo inicializar si hay datos
      // Verifica si el DataTable ya está inicializado
      if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
        new DataTable("#TableDinamic", {
          responsive: true,
          lengthChange: false,
          pageLength: 10,
          language: {
            search: "",
            searchPlaceholder: "Buscar...", // Añade un placeholder
            emptyTable: "No hay datos disponibles en la tabla", // Cambia el mensaje si no hay datos
          },
        });
      }
    }
  }, [data]); // Se vuelve a ejecutar si 'data' cambia

  return (
    <div className="container">
      <table className="table table-responsive" id="TableDinamic">
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th scope="col" key={index}>{title}</th>
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
    </div>
  );
}

export default WriteTable;
