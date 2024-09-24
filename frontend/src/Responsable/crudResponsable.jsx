import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormResponsable from '../Responsable/formResponsable';
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import WriteTable from '../Tabla/Data-Table';


const URI = process.env.REACT_APP_SERVER_BACK + '/responsable/';

const CrudResponsable = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsable, setResponsable] = useState(null);
  const [formData, setFormData] = useState({}); // Para manejar el estado del formulario

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const respuesta = await axios.get(URI);
        if (Array.isArray(respuesta.data)) {
          setResponsableList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setResponsableList([]);
        }
      } catch (error) {
        console.error("Error al obtener responsables:", error);
        setResponsableList([]);
      }
    };
    fetchResponsables();
  }, []);

  const getResponsable = async (Id_Responsable) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Responsable}`);
      setResponsable(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el responsable:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del responsable.',
        confirmButtonText: 'Aceptar',
      });
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
      data[key] !== responsable[key]
    );
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitResponsable = async () => {
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
        await axios.put(`${URI}${responsable.Id_Responsable}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El responsable se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await axios.post(URI, formData);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El responsable se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI);
      setResponsableList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setResponsable(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar el responsable:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar el responsable.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este responsable?")) {
      try {
        await axios.delete(`${URI}${Id_Responsable}`);
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'El responsable se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
        const respuesta = await axios.get(URI);
        setResponsableList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar el responsable:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al eliminar el responsable.',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setResponsable(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  const titles = ['Codigo', 'Nombre', 'Teléfono', 'Tipo  Responsable', 'Género', 'Acciones'];
  const data = responsableList.length === 0
    ? [[
      '', '', '', '', '',
    
    ]]
    : responsableList.map(responsable => [
      responsable.Id_Responsable,
      responsable.Nom_Responsable,
      responsable.Tel_Responsable,
      responsable.Tip_Responsable,
      responsable.Tip_Genero,
      <div key={responsable.Id_Responsable} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getResponsable(responsable.Id_Responsable)}
          title="Editar"
          style={{ pointerEvents: responsableList.length > 0 ? 'auto' : 'none', opacity: responsableList.length > 0 ? 1 : 0.5 }} // Desactivar si no hay registros
        >
          <img
            src="/pencil-square.svg"
            alt="Editar"
            style={{ width: '20px', height: '20px' }}
          />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteResponsable(responsable.Id_Responsable)}
          title="Borrar"
          style={{ pointerEvents: responsableList.length > 0 ? 'auto' : 'none', opacity: responsableList.length > 0 ? 1 : 0.5 }} // Desactivar si no hay registros
        >
          <img
            src="/trash3.svg"
            alt="Borrar"
            style={{ width: '20px', height: '20px' }}
          />
        </a>
      </div>
    ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>Gestionar Responsables</h1>
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

        <WriteTable titles={titles} data={data} fileName="Gestionar_Responsable" />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setResponsable(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Responsable" : "Agregar Responsable"}
        >
          <FormResponsable
            buttonForm={buttonForm}
            responsable={responsable}
            onSubmit={handleSubmitResponsable}
            onInputChange={handleInputChange} // Manejar cambios en el formulario
            formData={formData} // Pasar el estado del formulario
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudResponsable;