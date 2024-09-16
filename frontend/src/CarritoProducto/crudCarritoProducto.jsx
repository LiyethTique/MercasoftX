import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCarritoProducto from './formCarritoProducto'; 
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = process.env.REACT_APP_SERVER_BACK + '/carritoproducto/';

const CrudCarritoProducto = () => {
  const [carritoProductoList, setCarritoProductoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carritoProducto, setCarritoProducto] = useState(null);

  useEffect(() => {
    getAllCarritoProductos();
  }, []);

  const getAllCarritoProductos = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setCarritoProductoList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setCarritoProductoList([]);
      }
    } catch (error) {
      console.error("Error fetching carrito productos:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Carrito Productos", "error");
    }
  };

  const getCarritoProducto = async (Id_carritoProducto) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_carritoProducto}`);
      setCarritoProducto(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Carrito Producto", "error");
    }
  };

  const handleSubmitCarritoProducto = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${carritoProducto.Id_carritoProducto}`, data);
        Swal.fire("Actualizado!", "El carrito producto ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El carrito producto ha sido creado.", "success");
      }
      getAllCarritoProductos();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setCarritoProducto(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Carrito Producto", "error");
    }
  };

  const deleteCarritoProducto = async (Id_carritoProducto) => {
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
          await axios.delete(`${URI}${Id_carritoProducto}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllCarritoProductos();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Carrito Producto", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setCarritoProducto(null);
    setIsModalOpen(true);
  };

  const titles = ['ID CarritoProducto', 'ID Carrito', 'ID Producto', 'Acciones'];
  const data = carritoProductoList.map(carritoProducto => [
    carritoProducto.Id_carritoProducto,
    carritoProducto.Id_Carrito,
    carritoProducto.Id_Producto,
    <div key={carritoProducto.Id_carritoProducto}>
      <a
        href="#!"
        className="btn-custom me-2"
        onClick={() => getCarritoProducto(carritoProducto.Id_carritoProducto)}
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
        onClick={() => deleteCarritoProducto(carritoProducto.Id_carritoProducto)}
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
          <h1>Gestionar Carrito Productos</h1>
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
          onClose={() => { setIsModalOpen(false); setCarritoProducto(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Carrito Producto" : "Agregar Carrito Producto"}
        >
          <FormCarritoProducto
            buttonForm={buttonForm}
            carritoProducto={carritoProducto}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitCarritoProducto}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudCarritoProducto;
