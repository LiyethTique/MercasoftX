import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCliente from '../Cliente/formCliente';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';
import './crudCliente.css';
import { IoTrash, IoPencil } from "react-icons/io5";
import { Button } from 'react-bootstrap';

const URI = process.env.REACT_APP_SERVER_BACK + '/cliente/';

const CrudCliente = () => {
  const [clienteList, setClienteList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cliente, setCliente] = useState(null);
  const moduleName = "Gestionar Clientes"

  useEffect(() => {
    getAllClientes();
  }, []);

  const getAllClientes = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setClienteList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setClienteList([]);
      }
    } catch (error) {
      console.error("Error fetching clientes:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Clientes", "error");
    }
  };

  const getCliente = async (Id_Cliente) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Cliente}`);
      setCliente(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Cliente", "error");
    }
  };

  const handleSubmitCliente = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${cliente.Id_Cliente}`, data);
        Swal.fire("Actualizado!", "El cliente ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El cliente ha sido creado.", "success");
      }
      getAllClientes();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setCliente(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Cliente", "error");
    }
  };

  const deleteCliente = async (Id_Cliente) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URI}${Id_Cliente}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllClientes();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Cliente", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setCliente(null);
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre Cliente', 'Correo Cliente', 'Teléfono Cliente', 'Acciones'];
  const data = clienteList.length === 0
   ? [[ '', '', '', '', '' ]]
  : clienteList.map(clienteItem => [
    clienteItem.Id_Cliente,
    clienteItem.Nom_Cliente,
    clienteItem.Cor_Cliente,
    clienteItem.Tel_Cliente,
    <div key={clienteItem.Id_Cliente}>
      <a
        href="#!"
        className='btn-custom me-2'
        onClick={() => getCliente(clienteItem.Id_Cliente)}
        title="Editar"
        style={{ pointerEvents: clienteItem.length > 0 ? 'auto' : 'none', opacity: clienteItem.length > 0 ? 1 : 0.5 }}
      >
        <IoPencil size={20} color="blue" />
      </a>
      <a
        href="#!"
        className='btn-custom'
        onClick={() => deleteCliente(clienteItem.Id_Cliente)}
        title="Borrar"
        style={{ pointerEvents: clienteItem.length > 0 ? 'auto' : 'none', opacity: clienteItem.length > 0 ? 1 : 0.5 }}
      >
        <IoTrash size={20} color="red" />
      </a>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>{moduleName}</h1>
        </center>
        
        {/* Botón para abrir el modal */}
        <div className="d-flex justify-content-between mb-3">
          <Button
            style={{ backgroundColor: 'orange', borderColor: 'orange' }}
            onClick={handleShowForm}>
            <img
              src="/plus-circle (1).svg"
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
            />
            Registrar
          </Button>
        </div>

        {/* Tabla de datos */}
        <WriteTable titles={titles} data={data} moduleName={moduleName} />

        {/* Modal Reutilizable */}
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setCliente(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Cliente" : "Agregar Cliente"}
        >
          <FormCliente 
            buttonForm={buttonForm}
            cliente={cliente}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitCliente}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudCliente;
