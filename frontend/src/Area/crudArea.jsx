import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormArea from './formArea';
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/area/';

const CrudArea = () => {
  const [areaList, setAreaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [area, setArea] = useState(null);
  const [formData, setFormData] = useState({ Nom_Area: '' }); // Inicializar Nom_Area
  const [errors, setErrors] = useState({}); // Para manejar errores de validación

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera
          }
        });
        if (Array.isArray(respuesta.data)) {
          setAreaList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setAreaList([]);
        }
      } catch (error) {
        console.error("Error al obtener áreas:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener las Áreas", "error");
        setAreaList([]);
      }
    };
    
    fetchAreas();
  }, [URI, token]); // Incluir URI y token como dependencias para el efecto
  
  const getArea = async (Id_Area) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Area}`, {
        headers: {
          Authorization: `Bearer ${token}` // Incluir el token en la cabecera
        }
      });
      setArea(respuesta.data);
      setFormData({ Nom_Area: respuesta.data.Nom_Area }); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el área:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del área.',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  
  const handleSubmitArea = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, corrige los errores en el formulario.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    try {
      if (buttonForm === 'Actualizar') {
        if (!hasChanges(formData)) {
          Swal.fire({
            icon: 'warning',
            title: 'Sin cambios',
            text: 'Debes realizar cambios en al menos un campo para actualizar.',
            confirmButtonText: 'Aceptar',
          });
          return;
        }
        await axios.put(`${URI}${area.Id_Area}`, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El área se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await axios.post(URI, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El área se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}` // Incluir el token en la cabecera
        }
      });
      setAreaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setArea(null);
      setFormData({ Nom_Area: '' }); // Reiniciar el estado del formulario
      setErrors({});
    } catch (error) {
      console.error("Error al guardar el área:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar el área.',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  
  const deleteArea = async (Id_Area) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta área?")) {
      try {
        await axios.delete(`${URI}${Id_Area}`, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'El área se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera
          }
        });
        setAreaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar el área:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al eliminar el área.',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };  

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setArea(null);
    setFormData({ Nom_Area: '' }); // Reiniciar el estado del formulario
    setErrors({});
    setIsModalOpen(true);
  };
  
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.Nom_Area) {
      validationErrors.Nom_Area = 'El nombre del área es requerido.';
    }
    return validationErrors;
  };
  
  // Nueva función para manejar los cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar error del campo
  };

  const titles = ['ID', 'Nombre del Área', 'Acciones'];
  const data = areaList.length === 0
    ? [[
      '', '', '',
    ]]
    : areaList.map(areaItem => [
      areaItem.Id_Area,
      areaItem.Nom_Area,
      <div key={areaItem.Id_Area}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getArea(areaItem.Id_Area)}
          title="Editar"
          style={{ pointerEvents: areaList.length > 0 ? 'auto' : 'none', opacity: areaList.length > 0 ? 1 : 0.5 }} // Desactivar si no hay registros
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
          onClick={() => deleteArea(areaItem.Id_Area)}
          title="Borrar"
          style={{ pointerEvents: areaList.length > 0 ? 'auto' : 'none', opacity: areaList.length > 0 ? 1 : 0.5 }} // Desactivar si no hay registros
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
          <h1>Gestionar Áreas</h1>
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

        <WriteTable titles={titles} data={data} fileName="Gestionar_Area" />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setArea(null); setButtonForm('Enviar'); setErrors({}); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Área" : "Agregar Área"}
        >
          <FormArea
            buttonForm={buttonForm}
            onSubmit={handleSubmitArea}
            onInputChange={handleInputChange} // Pasar el manejador de cambios
            formData={formData} // Pasar los datos del formulario
            errors={errors} // Pasar errores de validación
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudArea;
