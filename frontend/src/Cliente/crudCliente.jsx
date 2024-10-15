import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCliente from '../Cliente/formCliente'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/cliente/';

const CrudCliente = () => {
  const [clienteList, setClienteList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar la vista
  const moduleName="Gestionar Clientes"

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (Array.isArray(respuesta.data)) {
          setClienteList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setClienteList([]);
        }
      } catch (error) {
        console.error("Error al obtener clientes:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener clientes", "error");
        setClienteList([]);
      }
    };
    fetchClientes();
  }, [token]);

  const getCliente = async (Id_Cliente) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Cliente}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCliente(respuesta.data);
      setFormData(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el cliente", "error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hasChanges = (data) => {
    return Object.keys(data).some(key => data[key] !== cliente[key]);
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitCliente = async () => {
    if (hasSpaces(formData)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se permiten campos vacíos o que contengan solo espacios.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (buttonForm === 'Actualizar' && !hasChanges(formData)) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin cambios',
        text: 'Debes realizar cambios en al menos un campo para actualizar.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${cliente.Id_Cliente}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El cliente se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await axios.post(URI, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El cliente se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClienteList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setCliente(null);
      setFormData({});
      setShowForm(false); // Volver a mostrar la tabla después de enviar
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar el cliente.", "error");
    }
  };

  const deleteCliente = async (Id_Cliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await axios.delete(`${URI}${Id_Cliente}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'El cliente se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClienteList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al eliminar el cliente.", "error");
      }
    }
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setCliente(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const titles = ['Código Cliente', 'Nombre', 'Email', 'Teléfono'];
  const data = clienteList.length === 0
    ? [['', '', '', '', '']]
    : clienteList.map(cliente => [
      cliente.Id_Cliente,
      cliente.Nom_Cliente,
      cliente.Cor_Cliente,
      cliente.Tel_Cliente,
      <div key={cliente.Id_Cliente} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        
         
        
       
          
      </div>
    ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>{moduleName}</h1>
        </center>
     

        {/* Mostrar la tabla de clientes */}
        {!isModalOpen && (
          <WriteTable titles={titles} data={data} moduleName={moduleName} />
        )}

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setCliente(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Cliente" : "Agregar Cliente"}
        >
          <FormCliente
            buttonForm={buttonForm}
            cliente={cliente}
            onSubmit={handleSubmitCliente}
            formData={formData}
            onInputChange={handleInputChange}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudCliente;
