import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormEntrada from '../Entrada/formEntrada'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import WriteTable from '../Tabla/Data-Table';
import { IoTrash, IoPencil } from "react-icons/io5";

const URI = process.env.REACT_APP_SERVER_BACK + '/entrada/';

const CrudEntrada = () => {
  const [entradaList, setEntradaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entrada, setEntrada] = useState(null);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchEntradas = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        if (Array.isArray(respuesta.data)) {
          setEntradaList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setEntradaList([]);
        }
      } catch (error) {
        console.error("Error al obtener entradas:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener entradas", "error");
        setEntradaList([]);
      }
    };
    fetchEntradas();
  }, [token]);

  const getEntrada = async (Id_Entrada) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Entrada}`, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setEntrada(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener la entrada:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la entrada", "error");
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
    return Object.keys(data).some(key => data[key] !== entrada[key]);
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitEntrada = async () => {
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
        await axios.put(`${URI}${entrada.Id_Entrada}`, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'La entrada se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await axios.post(URI, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'La entrada se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setEntradaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setEntrada(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar la entrada:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar la entrada.", "error");
    }
  };

  const deleteEntrada = async (Id_Entrada) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta entrada?")) {
      try {
        await axios.delete(`${URI}${Id_Entrada}`, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'La entrada se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        setEntradaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar la entrada:", error);
        Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al eliminar la entrada.", "error");
      }
    }
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setEntrada(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  const titles = [
    'Código Entrada', 'Descripción', 'Fecha Entrada', 'Origen', 'Destino', 
    'Valor Unitario', 'Valor Total', 'Unidad', 'Producto', 'Responsable', 
    'Cantidad', 'Fecha Vencimiento', 'Acciones'
  ];

  const data = entradaList.length === 0
    ? [['', '', '', '', '', '', '', '', '', '', '', '']]
    : entradaList.map(entrada => [
      entrada.Id_Entrada,
      entrada.Dcp_Entrada,
      entrada.Fec_Entrada,
      entrada.Ori_Entrada,
      entrada.Des_Entrada,
      entrada.Val_Unitario,
      entrada.Val_Total,
      entrada.unidad?.Nom_Unidad || 'Sin unidad', // Encadenamiento opcional
      entrada.producto?.Nom_Producto || 'Sin producto', // Encadenamiento opcional
      entrada.responsable?.Nom_Responsable || 'Sin responsable', // Encadenamiento opcional
      entrada.Can_Entrada,
      entrada.Fec_Vencimiento,
      <div key={entrada.Id_Entrada} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getEntrada(entrada.Id_Entrada)}
          title="Editar"
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteEntrada(entrada.Id_Entrada)}
          title="Borrar"
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
          <h1>Gestionar Entradas</h1>
        </center>
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

        <WriteTable titles={titles} data={data} fileName="Gestionar_Entrada" />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEntrada(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Entrada" : "Agregar Entrada"}
        >
          <FormEntrada
            buttonForm={buttonForm}
            entrada={entrada}
            onSubmit={handleSubmitEntrada}
            onInputChange={handleInputChange}
            formData={formData} // Pasar formData como prop
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudEntrada;
