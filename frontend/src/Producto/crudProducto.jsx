import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormProducto from './formProducto';
import Sidebar from '../Sidebar/Sidebar';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';
import './crudProducto.css';

const URI = process.env.REACT_APP_SERVER_BACK + '/producto/';

const CrudProducto = () => {
  const [productoList, setProductoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [producto, setProducto] = useState(null);
  const [originalProducto, setOriginalProducto] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    getAllProductos();
  }, []);

  const getAllProductos = async () => {
    try {
      const response = await axios.get(URI);
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setProductoList([]);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
        } else {
          setProductoList(response.data);
        }
      } else {
        console.error("Unexpected response format:", response.data);
        setProductoList([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los productos", "error");
    }
  };

  const getProducto = async (Id_Producto) => {
    console.log("Id_Producto:", Id_Producto);
    setButtonForm('Actualizar');
    try {
      const response = await axios.get(`${URI}${Id_Producto}`);
      setOriginalProducto(response.data);
      setProducto(response.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el producto", "error");
    }
  };

  const handleSubmitProducto = async (data) => {
    if (buttonForm === 'Actualizar') {
      if (JSON.stringify(data) === JSON.stringify(originalProducto)) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención.',
          text: 'Por favor, realice al menos una modificación antes de actualizar.',
        });
        return;
      }
    }

    try {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }

      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${producto.Id_Producto}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire("Actualizado!", "El producto ha sido actualizado.", "success");
      } else {
        await axios.post(URI, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire("Creado!", "El producto ha sido creado.", "success");
      }
      getAllProductos();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setProducto(null);
      setOriginalProducto(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el producto", "error");
    }
  };

  const deleteProducto = async (Id_Producto) => {
    console.log("Deleting product with ID:", Id_Producto);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URI}${Id_Producto}`);
          Swal.fire("¡Borrado!", "El producto ha sido borrado.", "success");
          getAllProductos();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el producto", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setProducto(null);
    setOriginalProducto(null);
    setIsModalOpen(true);
  };

  const titles = [
    'Código Producto', 'Nombre', 'Características', 'Precio Promedio', 'Existencias',
    'Imagen', 'Fecha Vencimiento', 'Categoría', 'Precio Anterior', 'Unidad de Medida',
    'Precio', 'Acciones'
  ];

  const data = productoList.map(producto => [
    producto.Id_Producto,
    producto.Nom_Producto,
    producto.Car_Producto,
    producto.Exi_Producto,
    <img src={`/imagenes/${producto.Ima_Producto}`} alt={producto.Nom_Producto} style={{ maxWidth: '100px', height: 'auto' }} />,
    producto.Fec_Vencimiento,
    producto.Id_Unidad,
    producto.Uni_DeMedida,
    producto.Pre_Producto,
    <div key={producto.Id_Producto} className="acciones">
      <a
        href="#!"
        className="btn-custom me-2"
        onClick={() => getProducto(producto.Id_Producto)}
        title="Editar"
      >
        <img
          src="/pencil-square.svg"
          alt="Editar"
          style={{ width: '13px', height: '13px' }}
        />
      </a>
      <a
        href="#!"
        className="btn-custom"
        onClick={() => deleteProducto(producto.Id_Producto)}
        title="Borrar"
      >
        <img
          src="/trash3.svg"
          alt="Borrar"
        />
      </a>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>Gestionar Productos</h1>
        </center>

        {showMessage && (
          <div className="alert alert-warning text-center" role="alert">
            No hay productos registrados en la base de datos.
          </div>
        )}

        <div className="d-flex justify-content-between mb-3">
          <a
            href="#!"
            className="btn btn-success d-flex align-items-center"
            onClick={handleShowForm}
          >
            <img
              src="/plus-circle.svg"
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
            />
            Registrar
          </a>
        </div>

        <WriteTable titles={titles} data={data} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setProducto(null); setButtonForm('Enviar'); setOriginalProducto(null); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Producto" : "Agregar Producto"}
        >
          <FormProducto
            buttonForm={buttonForm}
            producto={producto}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitProducto}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudProducto;
