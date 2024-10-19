import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormEntrada from '../Entrada/formEntrada.jsx'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/entrada/';

const CrudEntrada = () => {
  const [entradaList, setEntradaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entrada, setEntrada] = useState(null);
  const [formData, setFormData] = useState({
    Dcp_Entrada: '',
    Fec_Entrada: '',
    Ori_Entrada: 0,
    Des_Entrada: 0,
    Val_Unitario: 0,
    Val_Total: 0,
    Id_Unidad: 0,
    Id_Producto: 0,
    Id_Responsable: 0,
    Can_Entrada: 0,
    Fec_Vencimiento: '',
  });
  const moduleName = "Gestionar Entradas";

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

    // Verifica que name corresponda a los campos correctos del formData
    setFormData(prevState => ({
      ...prevState,
      [name]: value.trim(),  // Asegúrate de eliminar espacios en blanco no deseados
    }));
  };


  const hasChanges = (data) => {
    return Object.keys(data).some(key =>
      data[key] !== entrada[key]
    );
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
      setFormData({});
    } catch (error) {
      console.error("Error al guardar la entrada:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar la entrada.", "error");
    }
  };

  const deleteEntrada = async (Id_Entrada) => {
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
          await axios.delete(`${URI}${Id_Entrada}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
            }
          });
          Swal.fire("¡Borrado!", "La entrada ha sido borrada.", "success");
          const respuesta = await axios.get(URI, {
            headers: {
              Authorization: `Bearer ${token}` // Añadir el token a la solicitud
            }
          });
          setEntradaList(respuesta.data);
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar la entrada", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setEntrada(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CO').format(value);
  };

  const titles = ['ID', 'Descripción', 'Fecha Entrada', 'Origen', 'Destino', 'Val Unitario', 'Val Total', 'Unidad', 'Producto', 'Responsable', 'Cantidad', 'Fec Vencimiento', 'Acciones'];
  const data = entradaList.length === 0
    ? [[
      '', '', '', '', '', '', '', '', '', '', '', '',
    ]]
    : entradaList.map(entradaItem => [
      entradaItem.Id_Entrada,
      entradaItem.Dcp_Entrada,
      entradaItem.Fec_Entrada,
      entradaItem.Ori_Entrada,
      entradaItem.Des_Entrada,
      formatNumber(entradaItem.Val_Unitario),
      formatNumber(entradaItem.Val_Total),
      entradaItem.Id_Unidad,
      entradaItem.Id_Producto,
      entradaItem.Id_Responsable,
      entradaItem.Can_Entrada,
      entradaItem.Fec_Vencimiento,
      <div key={entradaItem.Id_Entrada} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getEntrada(entradaItem.Id_Entrada)}
          title="Editar"
          style={{ pointerEvents: entradaList.length > 0 ? 'auto' : 'none', opacity: entradaList.length > 0 ? 1 : 0.5 }}
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteEntrada(entradaItem.Id_Entrada)}
          title="Borrar"
          style={{ pointerEvents: entradaList.length > 0 ? 'auto' : 'none', opacity: entradaList.length > 0 ? 1 : 0.5 }}
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
          onClose={() => { setIsModalOpen(false); setEntrada(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Entrada" : "Agregar Entrada"}
        >
          <FormEntrada
            buttonForm={buttonForm}
            entrada={entrada}
            onSubmit={handleSubmitEntrada}
            onInputChange={handleInputChange}
            formData={formData} // Pasar el estado del formulario
          />
        </ModalForm>
      </div>
    </>
  );
}

export default CrudEntrada;