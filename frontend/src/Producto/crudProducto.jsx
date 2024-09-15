import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormProducto from '../Producto/formProducto';  
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/producto/';

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
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${producto.Id_Producto}`, data);
        Swal.fire("Actualizado!", "El producto ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
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
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
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

  const titles = ['ID', 'Nombre', 'Descripción', 'Precio Promedio', 'Existencia', 'Imagen', 'Fecha Vencimiento', 'Categoría', 'Precio Anterior', 'Unidad de Medida', 'Precio', 'Acciones'];
  const data = productoList.map(producto => [
    producto.Id_Producto,
    producto.Nom_Producto,
    producto.Car_Producto,
    producto.Pre_Promedio,
    producto.Exi_Producto,
    producto.Ima_Producto,
    producto.Fec_Vencimiento,
    producto.Id_Categoria,
    producto.Pre_Anterior,
    producto.Uni_DeMedida,
    producto.Pre_Producto,
    <div key={producto.Id_Producto}>
      <button 
        className="btn btn-warning me-2" 
        onClick={() => getProducto(producto.Id_Producto)}
        title="Editar"
      >
        <img 
          src="/pencil-square.svg" 
          alt="Editar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
      <button 
        className="btn btn-danger" 
        onClick={() => deleteProducto(producto.Id_Producto)}
        title="Borrar"
      >
        <img 
          src="/archive.svg" 
          alt="Borrar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
    </div>
  ]);

  const moduleName = "Gestionar Productos";

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>{moduleName}</h1>
        </center>
        
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>   
            <img
              src="/plus-circle (1).svg"
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
            />
            Registrar
          </button>
        </div>

        <WriteTable titles={titles} data={data} moduleName={moduleName} /> 

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setProducto(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Producto" : "Agregar Producto"}
        >
          <FormProducto 
            buttonForm={buttonForm}
            producto={producto}
            URI={URI}
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