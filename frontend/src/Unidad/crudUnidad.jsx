import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormUnidad from '../Unidad/formUnidad.jsx'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/unidad/';

const CrudUnidad = () => {
  const [unidadList, setUnidadList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unidad, setUnidad] = useState(null);
  const [formData, setFormData] = useState({}); // Para manejar el estado del formulario
  const moduleName = "Gestionar Unidades"

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        if (Array.isArray(respuesta.data)) {
          setUnidadList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setUnidadList([]);
        }
      } catch (error) {
        console.error("Error al obtener unidades:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener unidades", "error");
        setUnidadList([]);
      }
    };
    fetchUnidades();
  }, [token]);

  const getUnidad = async (Nom_Area) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Nom_Area}`, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setUnidad(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener la unidad:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la unidad", "error");
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
    return Object.keys(data).some(key =>
      data[key] !== unidad[key]
    );
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitUnidad = async () => {
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
        await axios.put(`${URI}${unidad.Id_Unidad}`, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'La unidad se ha actualizado exitosamente.',
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
          text: 'La unidad se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setUnidadList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setUnidad(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar la unidad:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar la unidad.", "error");
    }
  };

  const deleteUnidad = async (Id_Unidad) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este registro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URI}${Id_Unidad}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
            }
          });
          Swal.fire("¡Borrado!", "El responsable ha sido borrado.", "success");
          getAllProductos();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el responsable", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setUnidad(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  const titles = ['Código', 'Área', 'Responsable', 'Nombre Unidad', 'Acciones'];
  const data = unidadList.length === 0
    ? [[
      '', '', '', '',
    ]]
    : unidadList.map(unidadItem => [
      unidadItem.Id_Unidad,
      unidadItem.area.Nom_Area, // Si necesitas mostrar el nombre del área, necesitarás una relación para obtenerlo
      unidadItem.responsable.Nom_Responsable, // Lo mismo aquí para el responsable
      unidadItem.Nom_Unidad,
      <div key={unidadItem.Id_Unidad} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getUnidad(unidadItem.Id_Unidad)}
          title="Editar"
          style={{ pointerEvents: unidadList.length > 0 ? 'auto' : 'none', opacity: unidadList.length > 0 ? 1 : 0.5 }}
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteUnidad(unidadItem.Id_Unidad)}
          title="Borrar"
          style={{ pointerEvents: unidadList.length > 0 ? 'auto' : 'none', opacity: unidadList.length > 0 ? 1 : 0.5 }}
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

        <WriteTable titles={titles} data={data} moduleName={moduleName} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setUnidad(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Unidad" : "Agregar Unidad"}
        >
          <FormUnidad
            buttonForm={buttonForm}
            unidad={unidad}
            onSubmit={handleSubmitUnidad}
            onInputChange={handleInputChange}
            formData={formData} // Pasar formData como prop
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudUnidad;