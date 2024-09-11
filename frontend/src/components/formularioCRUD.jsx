import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const FormularioCRUD = ({ entidad, campos, registros, crearRegistro, actualizarRegistro, eliminarRegistro }) => {
  const [showModal, setShowModal] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);
  const [nuevoRegistro, setNuevoRegistro] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro({ ...nuevoRegistro, [name]: value });
  };

  const handleOpenModal = (registro = null) => {
    setRegistroActual(registro);
    setNuevoRegistro(registro || {});
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registroActual) {
      actualizarRegistro(nuevoRegistro);
    } else {
      crearRegistro(nuevoRegistro);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmacion = window.confirm('¿Desea eliminar este registro por completo?');
    if (confirmacion) {
      eliminarRegistro(id);
    }
  };

  // Definir columnas para DataTable
  const columns = campos.map((campo) => ({
    name: campo.charAt(0).toUpperCase() + campo.slice(1),
    selector: (row) => row[campo],
    sortable: true,
  }));

  // Añadir columna de acciones (Editar y Eliminar)
  columns.push({
    name: 'Acciones',
    cell: (row) => (
      <>
        <button onClick={() => handleOpenModal(row)}>Editar</button>
        <button onClick={() => handleDelete(row.id)}>Eliminar</button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });

  return (
    <div>
      <h2>{entidad}</h2>
      <button onClick={() => handleOpenModal()}>Registrar nuevo {entidad}</button>

      {/* Componente DataTable con búsqueda, paginación y ordenamiento */}
      <DataTable
        columns={columns}
        data={registros}
        pagination
        highlightOnHover
        pointerOnHover
        selectableRows={false} // Puedes habilitar la selección de filas si lo necesitas
        noDataComponent="No hay registros disponibles"
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{registroActual ? `Editar ${entidad}` : `Registrar ${entidad}`}</h3>
            <form onSubmit={handleSubmit}>
              {campos.map((campo) => (
                <div key={campo}>
                  <label>{campo}:</label>
                  <input
                    type="text"
                    name={campo}
                    value={nuevoRegistro[campo] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button type="submit">
                {registroActual ? 'Actualizar' : 'Registrar'}
              </button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCRUD;