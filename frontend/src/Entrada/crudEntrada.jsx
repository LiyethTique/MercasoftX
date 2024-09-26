import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormEntrada from './formEntrada';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model.jsx';
import AlertaBDVacia from '../alertas/alertaBDVacia.jsx'

const URI = (process.env.REACT_APP_SERVER_BACK || 'http://localhost:3002') + '/entrada/';

const CrudEntrada = () => {
  const [entradaList, setEntradaList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [entrada, setEntrada] = useState(null);
  const moduleName = "Gestionar Entradas"; // Nombre del módulo

  useEffect(() => {
    getAllEntradas();
  }, []);

  const getAllEntradas = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setEntradaList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setEntradaList([]);
      }
    } catch (error) {
      console.error("Error fetching entradas:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener las Entradas", "error");
    }
  };

  const handleShowForm = () => {
    setEntrada(null); // Limpiar la entrada actual para un nuevo formulario
    setButtonForm('Enviar'); // Cambiar el botón a 'Enviar' para nuevas entradas
    setIsModalOpen(true); // Mostrar el modal
  };

  const handleSubmitEntrada = async (entradaData) => {
    try {
      if (buttonForm === 'Actualizar') {
        // Actualizar entrada existente
        await axios.put(`${URI}${entradaData.Id_Entrada}`, entradaData);
        Swal.fire("Éxito", "Entrada actualizada correctamente", "success");
      } else {
        // Crear nueva entrada
        await axios.post(URI, entradaData);
        Swal.fire("Éxito", "Entrada creada correctamente", "success");
      }
      setIsModalOpen(false); // Cerrar el modal
      getAllEntradas(); // Refrescar la lista de entradas
    } catch (error) {
      console.error("Error al enviar la entrada:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al enviar la entrada", "error");
    }
  };

  // Definir la función getEntrada
  const getEntrada = async (id) => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setEntrada(response.data); // Guardar los datos de la entrada para editar
      setButtonForm('Actualizar'); // Cambiar el texto del botón a 'Actualizar'
      setIsModalOpen(true); // Abrir el modal para editar
    } catch (error) {
      console.error("Error al obtener la entrada:", error);
      Swal.fire("Error", "Error al obtener la entrada para editar", "error");
    }
  };

  const deleteEntrada = async (id) => {
    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Si eliminas esta entrada, se borrará de la base de datos por completo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}${id}`);
        Swal.fire('Eliminada', 'La entrada ha sido eliminada correctamente.', 'success');
        getAllEntradas(); // Refrescar la lista de entradas
      } catch (error) {
        console.error("Error al eliminar la entrada:", error);
        Swal.fire("Error", "Error al eliminar la entrada", "error");
      }
    } else {
      // Si el usuario cancela, mostrar un mensaje de cancelación
      Swal.fire('Cancelado', 'La entrada no fue eliminada', 'info');
    }
  };  

  const titles = ['ID', 'Fecha Entrada', 'Hora', 'Unidad', 'Producto', 'Responsable', 'Cantidad', 'Fecha Vencimiento', 'Acciones'];
  const data = entradaList.map(entrada => [
    entrada.Id_Entrada,
    entrada.Fec_Entrada,
    entrada.Hor_Entrada,
    entrada.Id_Unidad,
    entrada.Id_Producto,
    entrada.Id_Responsable,
    entrada.Can_Entrada,
    entrada.Fec_Vencimiento,
    <div key={entrada.Id_Entrada}>
      <button className="btn btn-warning me-2" onClick={() => getEntrada(entrada.Id_Entrada)} title="Editar">
        <img src="/pencil-square.svg" alt="Editar" style={{ width: '24px', height: '24px' }} />
      </button>
      <button className="btn btn-danger" onClick={() => deleteEntrada(entrada.Id_Entrada)} title="Borrar">
        <img src="/archive.svg" alt="Borrar" style={{ width: '24px', height: '24px' }} />
      </button>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center><h1>{moduleName}</h1></center>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>
          <img src="/plus-circle (1).svg" alt="Agregar Entrada" style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }} />
            Registrar
          </button>
        </div>
        <WriteTable titles={titles} data={data} moduleName={moduleName} />
        <AlertaBDVacia uri={URI} />
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={buttonForm === 'Actualizar' ? 'Actualizar Entrada' : 'Agregar Entrada'}
          onSubmit={() => {
            const form = document.querySelector('form');
            if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }}
        >
          <FormEntrada
            buttonForm={buttonForm}
            entrada={entrada}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitEntrada}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudEntrada;