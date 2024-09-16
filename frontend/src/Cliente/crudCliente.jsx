import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCliente from '../Cliente/formCliente.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model.jsx'; // Asegúrate de que esta ruta sea correcta

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/cliente/';

const CrudCliente = () => {
  const [clienteList, setClienteList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [cliente, setCliente] = useState(null);

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

  const titles = ['ID', 'Nombre', 'Correo', 'Teléfono', 'ID Carrito', 'Acciones'];
  const data = clienteList.map(cliente => [
    cliente.Id_Cliente,
    cliente.Nom_Cliente,
    cliente.Cor_Cliente,
    cliente.Tel_Cliente,
    cliente.Id_Carrito,
    <div key={cliente.Id_Cliente}>
      <button 
        className="btn btn-warning me-2" 
        onClick={() => getCliente(cliente.Id_Cliente)}
        title="Editar"
      >
        <img 
          src="/pencil-square.svg" 
          alt="Editar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
      <button 
        className="btn btn-danger" 
        onClick={() => deleteCliente(cliente.Id_Cliente)}
        title="Borrar"
      >
        <img 
          src="/archive.svg" 
          alt="Borrar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>Gestionar Clientes</h1>
        </center>
        
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>
            <img 
              src="/plus.svg" 
              alt="Agregar Cliente" 
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
            />
            Agregar Cliente
          </button>
        </div>

        <WriteTable 
          titles={titles}
          data={data}
        />

        <ModalForm 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={buttonForm === 'Actualizar' ? 'Actualizar Cliente' : 'Agregar Cliente'}
          onSubmit={() => {
            const form = document.querySelector('form');
            if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }}
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