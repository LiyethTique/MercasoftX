import React from 'react';
import DataTable from 'react-data-table-component';

const TablaRegistros = ({ registros, columnas }) => {
  return (
    <DataTable
      columns={columnas}
      data={registros}
      pagination
      highlightOnHover
      pointerOnHover
      selectableRows={false}
      noDataComponent="No hay registros disponibles"
    />
  );
};

export default TablaRegistros;