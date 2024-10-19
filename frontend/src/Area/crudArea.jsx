import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormArea from './formArea';
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/area/';

const CrudArea = () => {
  const [areaList, setAreaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [area, setArea] = useState(null);
  const [formData, setFormData] = useState({ Nom_Area: '' });
  const [errors, setErrors] = useState({});
  const moduleName = "Gestionar Áreas"

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("Respuesta del servidor:", respuesta.data);
        if (Array.isArray(respuesta.data)) {
          setAreaList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setAreaList([]);
        }
      } catch (error) {
        console.error("Error al obtener áreas:", error);
        setAreaList([]);
      }
    };
    fetchAreas();
  }, [token]); // Agregar token como dependencia

  const getArea = async (Id_Area) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Area}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Área obtenida:", respuesta.data);
      setArea(respuesta.data);
      setFormData({ Nom_Area: respuesta.data.Nom_Area });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Nom_Area || formData.Nom_Area.trim() === '') {
      newErrors.Nom_Area = 'El nombre del área es obligatorio.';
    }
    return newErrors;
  };

  const hasChanges = (data) => {
    return data.Nom_Area !== area.Nom_Area;
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
            Authorization: `Bearer ${token}`
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
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El área se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }

      // Actualizar la lista de áreas después de enviar el formulario
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Datos después de enviar el formulario:", respuesta.data);
      setAreaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setArea(null);
      setFormData({ Nom_Area: '' });
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
          await axios.delete(`${URI}${Id_Area}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
            }
          });
          // Mostrar alerta de éxito
          Swal.fire("¡Borrado!", "El área ha sido borrada exitosamente.", "success");
  
          // Filtrar el área eliminada de la lista local sin recargar la página
          setAreaList(prevList => prevList.filter(area => area.Id_Area !== Id_Area));
  
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el área", "error");
        }
      }
    });
  };  

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setArea(null);
    setFormData({ Nom_Area: '' });
    setErrors({});
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre del Área', 'Acciones'];
  const data = areaList.length === 0
    ? [['', '', '']]
    : areaList.map(areaItem => [
      areaItem.Id_Area,
      areaItem.Nom_Area,
      <div key={areaItem.Id_Area}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getArea(areaItem.Id_Area)}
          title="Editar"
          style={{ pointerEvents: areaList.length > 0 ? 'auto' : 'none', opacity: areaList.length > 0 ? 1 : 0.5 }}
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteArea(areaItem.Id_Area)}
          title="Borrar"
          style={{ pointerEvents: areaList.length > 0 ? 'auto' : 'none', opacity: areaList.length > 0 ? 1 : 0.5 }}
        >
          <IoTrash size={20} color="red" />
        </a>
      </div>
    ]);

  // console.log("Renderizando datos en la tabla:", data);

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
          onClose={() => { setIsModalOpen(false); setArea(null); setButtonForm('Enviar'); setErrors({}); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Área" : "Agregar Área"}
        >
          <FormArea
            buttonForm={buttonForm}
            onSubmit={handleSubmitArea}
            onInputChange={handleInputChange}
            formData={formData}
            errors={errors}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudArea;