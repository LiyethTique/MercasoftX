import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormVenta from '../Venta/formVenta'; // Asegúrate de tener este componente creado
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import WriteTable from '../Tabla/Data-Table';
import { IoTrash, IoPencil } from "react-icons/io5";

const URI = process.env.REACT_APP_SERVER_BACK + '/venta/';

const CrudVenta = () => {
  const [ventaList, setVentaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venta, setVenta] = useState(null);
  const [formData, setFormData] = useState({});
  const moduleName = "Gestionar Ventas"

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        if (Array.isArray(respuesta.data)) {
          setVentaList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setVentaList([]);
        }
      } catch (error) {
        console.error("Error al obtener ventas:", error);
        Swal.fire("Error", error.response?.data?.message || "Error al obtener ventas", "error");
        setVentaList([]);
      }
    };
    fetchVentas();
  }, [token]);

  const getVenta = async (Id_Venta) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Venta}`, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setVenta(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener la venta:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la venta", "error");
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
    return Object.keys(data).some(key => data[key] !== venta[key]);
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitVenta = async () => {
    if (hasSpaces(formData)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se permiten campos vacíos o que contengan solo espacios.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Validación para no permitir valores negativos
    if (formData.Val_Venta < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El valor de la venta no puede ser negativo.',
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
        await axios.put(`${URI}${venta.Id_Venta}`, formData, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'La venta se ha actualizado exitosamente.',
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
          text: 'La venta se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}` // Añadir el token a la solicitud
        }
      });
      setVentaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setVenta(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al guardar la venta.", "error");
    }
  };

  const deleteVenta = async (Id_Venta) => {
    // Usar await para manejar la respuesta de Swal.fire
    const result = await Swal.fire({
      title: '¿Estás seguro de que deseas eliminar esta venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    // Verifica si el usuario confirmó la eliminación
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}${Id_Venta}`, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
  
        // Mensaje de éxito al eliminar la venta
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'La venta se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
          timer: 3000, // Opcional: cerrar automáticamente después de 3 segundos
        });
  
        const respuesta = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}` // Añadir el token a la solicitud
          }
        });
        setVentaList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
        // Mensaje de error al intentar eliminar la venta
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || "Ocurrió un error al eliminar la venta.",
          confirmButtonText: 'Aceptar',
          timer: 5000, // Opcional: cerrar automáticamente después de 5 segundos
        });
      }
    }
  };
  
  

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setVenta(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CO').format(value);
  };

  const titles = ['Código Venta', 'Fecha Venta', 'Valor Venta', 'Tipo Cliente', 'Pedido', 'Producto', 'Acciones'];
  const data = ventaList.length === 0
    ? [['', '', '', '', '', '', '']]
    : ventaList.map(venta => [
      venta.Id_Venta,
      venta.Fec_Venta,
      formatNumber(venta.Val_Venta),
      venta.Tip_Cliente,
      venta.Id_Pedido,
      venta.producto.Nom_Producto,
      <div key={venta.Id_Venta} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getVenta(venta.Id_Venta)}
          title="Editar"
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteVenta(venta.Id_Venta)}
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
          onClose={() => { setIsModalOpen(false); setVenta(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Venta" : "Agregar Venta"}
        >
          <FormVenta
            buttonForm={buttonForm}
            venta={venta}
            onSubmit={handleSubmitVenta}
            formData={formData}
            onInputChange={handleInputChange} // Cambiado aquí
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudVenta;
