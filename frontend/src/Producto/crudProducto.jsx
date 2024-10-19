import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormProducto from '../Producto/formProducto';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import './crudProducto.css';

// Definición de las URIs
const URI = process.env.REACT_APP_SERVER_BACK + '/producto/';
const IMAGE_URI = `${process.env.REACT_APP_SERVER_BACK}${process.env.REACT_APP_IMAGE_PATH}`;

const CrudProducto = () => {
  const [productoList, setProductoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [producto, setProducto] = useState(null);
  const [formData, setFormData] = useState({
    Nom_Producto: '',
    Car_Producto: '',
    Exi_Producto: 0,
    Fec_Vencimiento: '',
    Id_Unidad: 0,
    Uni_DeMedida: '',
    Pre_Producto: 0,
    Ima_Producto: null,
  });
  const moduleName = "Gestionar Productos";

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    fetchProductos(); // Cargar la lista de productos cuando se monta el componente
  }, [token]);

  // Función para obtener todos los productos
  const fetchProductos = async () => {
    try {
      const respuesta = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
        }
      });
      if (Array.isArray(respuesta.data)) {
        setProductoList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setProductoList([]);
      }
    } catch (error) {
      console.error("Error fetching productos:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Productos", "error");
    }
  };

  // Función para obtener un producto específico
  const getProducto = async (Id_Producto) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Producto}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
        }
      });
      setProducto(respuesta.data);
      setFormData(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Producto", "error");
    }
  };

  // Manejo del formulario de creación y actualización de productos
  const handleSubmitProducto = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }

      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${producto.Id_Producto}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
          }
        });
        Swal.fire("Actualizado!", "El producto ha sido actualizado.", "success");
      } else {
        await axios.post(URI, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
            'Content-Type': 'multipart/form-data' // Asegurar multipart si se envían archivos
          }
        });
        Swal.fire("Creado!", "El producto ha sido creado.", "success");
      }

      setIsModalOpen(false); // Cerrar el modal después de la acción
      setButtonForm('Enviar'); // Restablecer el estado del botón
      setProducto(null); // Limpiar el producto seleccionado
      fetchProductos(); // Volver a cargar la lista sin recargar la página
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Producto", "error");
    }
  };

  // Función para manejar los cambios en los inputs del formulario
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para eliminar un producto
  const deleteProducto = async (Id_Producto) => {
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
          await axios.delete(`${URI}${Id_Producto}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token a la solicitud
            }
          });
          Swal.fire("¡Borrado!", "El producto ha sido borrado.", "success");
          fetchProductos(); // Actualizar la lista después de eliminar el producto
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Producto", "error");
        }
      }
    });
  };

  // Mostrar el formulario para crear un nuevo producto
  const handleShowForm = () => {
    setButtonForm('Enviar');
    setProducto(null);
    setFormData({
      Nom_Producto: '',
      Car_Producto: '',
      Exi_Producto: 0,
      Fec_Vencimiento: '',
      Id_Unidad: 0,
      Uni_DeMedida: '',
      Pre_Producto: 0,
      Ima_Producto: null,
    });
    setIsModalOpen(true);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CO').format(value);
  };

  const titles = ['ID', 'Nombre', 'Características', 'Existencias', 'Imagen', 'Fecha de Vencimiento', 'Nombre de Unidad', 'Unidad de Medida', 'Precio', 'Acciones'];
  const data = productoList.length === 0
    ? [[
      '', '', '', '', '', '',
    ]]
    : productoList.map(productoItem => {
      return [
        productoItem.Id_Producto,
        productoItem.Nom_Producto,
        productoItem.Car_Producto,
        productoItem.Exi_Producto,
        <img
          src={`${IMAGE_URI}${productoItem.Ima_Producto}`}
          alt="Imagen del producto"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />,
        productoItem.Fec_Vencimiento,
        productoItem.unidad.Nom_Unidad,
        productoItem.Uni_DeMedida,
        formatNumber(productoItem.Pre_Producto),
        <div key={productoItem.Id_Producto} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#!"
            className="btn-custom me-2"
            onClick={() => getProducto(productoItem.Id_Producto)}
            title="Editar"
          >
            <IoPencil size={20} color="blue" />
          </a>
          <a
            href="#!"
            className="btn-custom"
            onClick={() => deleteProducto(productoItem.Id_Producto)}
            title="Borrar"
          >
            <IoTrash size={20} color="red" />
          </a>
        </div>
      ];
    });

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
          onClose={() => { setIsModalOpen(false); setProducto(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Producto" : "Registrar Producto"}
        >
          <FormProducto
            formData={formData}
            setFormData={setFormData}
            onChange={onChange}
            onSubmit={handleSubmitProducto}
            buttonForm={buttonForm}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudProducto;