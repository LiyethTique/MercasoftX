import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCarrito from '../Carrito/formCarrito'; // Asegúrate de que el camino sea correcto
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table'; 
import ModalForm from '../Model/Model';

const URI = process.env.REACT_APP_SERVER_BACK + '/carrito/';

const CrudCarrito = () => {
  const [carritoList, setCarritoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    getAllCarrito();
  }, []);

  const getAllCarrito = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setCarritoList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setCarritoList([]);
      }
    } catch (error) {
      console.error("Error fetching carritos:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Carritos", "error");
    }
  };

  const getCarrito = async (Id_Carrito) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Carrito}`);
      setCarrito(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Carrito", "error");
    }
  };

  const handleSubmitCarrito = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${carrito.Id_Carrito}`, data);
        Swal.fire("Actualizado!", "El carrito ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El carrito ha sido creado.", "success");
      }
      getAllCarrito();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setCarrito(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Carrito", "error");
    }
  };

  const deleteCarrito = async (Id_Carrito) => {
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
          await axios.delete(`${URI}${Id_Carrito}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllCarrito();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Carrito", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setCarrito(null);
    setIsModalOpen(true);
  };

  const titles = ['ID   ', ' Producto', 'CanProducto', 'Cliente','Acciones'];
  const data = carritoList.map(carrito => [
    carrito.Id_Carrito,
    carrito.Id_Producto,
    carrito.Can_Producto,
    carrito.Id_Cliente,
    <div key={carrito.Id_Carrito}>
      <a 
        href="#!"
        className="btn-custom me-2"
        onClick={() => getCarrito(carrito.Id_Carrito)}
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
        onClick={() => deleteCarrito(carrito.Id_Carrito)}
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
          <h1>Gestionar Carritos</h1>
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
          onClose={() => { setIsModalOpen(false); setCarrito(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Carrito" : "Agregar Carrito"}
        >
          <FormCarrito 
            buttonForm={buttonForm}
            carrito={carrito}
            onSubmit={handleSubmitCarrito}
            onClose={() => { setIsModalOpen(false); setCarrito(null); setButtonForm('Enviar'); }}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudCarrito;
