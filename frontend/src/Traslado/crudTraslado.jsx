import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormTraslado from '../Traslado/formTraslado.jsx'; // Asegúrate de crear este componente
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

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTraslados = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`
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

  const getTraslado = async (Id_Traslado) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Traslado}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTraslado(respuesta.data);
      setFormData(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el traslado:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el traslado", "error");
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
      data[key] !== traslado[key]
    );
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

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
            Authorization: `Bearer ${token}`
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
            Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
        }
      });
      setTrasladoList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setTraslado(null);
      setFormData({});
    } catch (error) {
      console.error("Error al guardar el traslado:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar el traslado.", "error");
    }
  };

  const deleteTraslado = async (Id_Traslado) => {
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
          await axios.delete(`${URI}${Id_Traslado}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          Swal.fire("¡Borrado!", "El traslado ha sido borrado.", "success");
          const respuesta = await axios.get(URI, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTrasladoList(respuesta.data);
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el traslado", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setTraslado(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const titles = ['ID Traslado', 'Fecha', 'Descripción', 'Origen', 'Destino', 'Unidad de Medida', 'Producto', 'Cantidad', 'Valor Unitario', 'Responsable', 'Acciones'];
  const data = trasladoList.length === 0
    ? [[
      '', '', '', '', '', '', '', '', '', ''
    ]]
    : trasladoList.map(trasladoItem => [
      trasladoItem.Id_Traslado,
      trasladoItem.Fec_Traslado,
      trasladoItem.Dcp_Traslado,
      trasladoItem.Ori_Traslado,
      trasladoItem.Des_Traslado,
      trasladoItem.Uni_DeMedida,
      trasladoItem.Id_Producto,
      trasladoItem.Can_Producto,
      trasladoItem.Val_Unitario,
      trasladoItem.Id_Responsable,
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

        <WriteTable titles={titles} data={data} moduleName={moduleName} />

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
            formData={formData}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudTraslado;
