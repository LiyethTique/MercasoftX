import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormTraslado from '../Traslado/formTraslado.jsx'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/traslado/';

const CrudTraslado = () => {
  const [trasladoList, setTrasladoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traslado, setTraslado] = useState(null);
  const [formData, setFormData] = useState({});
  const moduleName = "Gestionar Traslados";

  const token = localStorage.getItem('token'); // Obtener el token una vez

  // Obtener la lista de traslados al cargar el componente
  useEffect(() => {
    const fetchTraslados = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        if (Array.isArray(respuesta.data)) {
        setTrasladoList(respuesta.data);
      } else {
        console.error("Formato de respuesta inesperado:", respuesta.data);
        setTrasladoList([]);
      }

      } catch (error) {
        console.error("Error al obtener traslados:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener traslados", "error");
        setTrasladoList([]);
      }
    };
    fetchTraslados();
  }, [token]);

  // Obtener un traslado específico para editarlo
  const getTraslado = async (Id_Traslado) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Traslado}`, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setTraslado(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario con los datos del traslado
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el traslado:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el traslado", "error");
    }
  };

  // Manejar el cambio de valores en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Verificar si se han realizado cambios en el formulario
  const hasChanges = (data) => {
    return Object.keys(data).some(key => data[key] !== traslado[key]);
  };

  // Verificar si hay espacios en blanco en los campos
  const hasSpaces = (data) => {
    return Object.values(data).some(value => typeof value === 'string' && value.trim() === '');
  };

  // Manejar el envío del formulario (registrar o actualizar traslado)
  const handleSubmitTraslado = async () => {
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
        await axios.put(`${URI}${traslado.Id_Traslado}`, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El traslado se ha actualizado exitosamente.',
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
          text: 'El traslado se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setTrasladoList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setTraslado(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar el traslado:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar el traslado.", "error");
    }
  };

  // Eliminar un traslado
  // Eliminar un traslado
const deleteTraslado = async (Id_Traslado) => {
  Swal.fire({
    title: "¿Estás seguro de borrar este registro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar!",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}${Id_Traslado}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
          }
        });

        Swal.fire({
          icon: "success",
          title: "¡Borrado!",
          text: "El traslado ha sido borrado.",
          confirmButtonText: "Aceptar",
        });

        // Actualizar la lista de traslados
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        setTrasladoList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Error al eliminar el traslado", "error");
      }
    }
  });
};


  // Mostrar el formulario para registrar un nuevo traslado
  const handleShowForm = () => {
    setButtonForm('Enviar');
    setTraslado(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  // Títulos de las columnas de la tabla
  const titles = ['Código', 'Fecha', 'Descripción', 'Origen', 'Destino', 'Producto', 'Cantidad', 'Valor Unitario', 'Responsable', 'Acciones'];

  // Datos de la tabla
  const data = trasladoList.length === 0
    ? [[
      '', '', '', '', '', '', '', '', '',
    ]]
    : trasladoList.map(trasladoItem => [
      trasladoItem.Id_Traslado,
      trasladoItem.Fec_Traslado,
      trasladoItem.Dcp_Traslado,
      trasladoItem.Ori_Traslado,
      trasladoItem.Des_Traslado,
      trasladoItem.producto.Nom_Producto,
      trasladoItem.Can_Producto,
      trasladoItem.Val_Unitario,
      trasladoItem.responsable.Nom_Responsable,
      <div key={trasladoItem.Id_Traslado} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getTraslado(trasladoItem.Id_Traslado)}
          title="Editar"
          style={{ pointerEvents: trasladoList.length > 0 ? 'auto' : 'none', opacity: trasladoList.length > 0 ? 1 : 0.5 }}
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteTraslado(trasladoItem.Id_Traslado)}
          title="Borrar"
          style={{ pointerEvents: trasladoList.length > 0 ? 'auto' : 'none', opacity: trasladoList.length > 0 ? 1 : 0.5 }}
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

        <WriteTable titles={titles} data={data} moduleName={moduleName}/>

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setTraslado(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Traslado" : "Agregar Traslado"}
        >
          <FormTraslado
            buttonForm={buttonForm}
            traslado={traslado}
            onSubmit={handleSubmitTraslado}
            onInputChange={handleInputChange}
            formData={formData} // Pasar formData como prop
          />
         
        </ModalForm>
      </div>
    </>
  );
};

export default CrudTraslado;