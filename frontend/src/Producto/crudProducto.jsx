import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormProducto from '../Producto/formProducto';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table'; 
import ModalForm from '../Model/Model';
import './crudProducto.css';

const URI = process.env.REACT_APP_SERVER_BACK + '/producto/';

const CrudProducto = () => {
  const [productoList, setProductoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getAllProductos();
  }, []);

  const getAllProductos = async () => {
    try {
      const respuesta = await axios.get(URI);
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

  const getProducto = async (Id_Producto) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Producto}`);
      setProducto(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Producto", "error");
    }
  };

  const handleSubmitProducto = async (data) => {
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
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Producto", "error");
    }
  };

  const deleteProducto = async (Id_Producto) => {
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
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Producto", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setProducto(null);
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre', 'Características', 'Existencias', 'Imagen', 'Fecha de Vencimiento', 'ID Unidad', 'Unidad de Medida', 'Precio', 'Acciones'];
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
        className ="btn-custom"
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
        
        <div className="d-flex justify-content-between mb-3">
          <a 
            href="#!"
            className="btn btn-success d-flex align-items-center"
            onClick={handleShowForm}
          >   
            <img
              src="/plus-circle (1).svg"
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
            />
            Registrar
          </a>
        </div>

        <WriteTable titles={titles} data={data} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setProducto(null); setButtonForm('Enviar'); }}
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