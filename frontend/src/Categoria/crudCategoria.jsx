import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCategoria from '../Categoria/formCategoria';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/categoria/';

const CrudCategoria = () => {
  const [categoriaList, setCategoriaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    getAllCategoria();
  }, []);

  const getAllCategoria = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setCategoriaList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setCategoriaList([]);
      }
    } catch (error) {
      console.error("Error fetching categorias:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener las Categorías", "error");
    }
  };

  const getCategoria = async (Id_Categoria) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Categoria}`);
      setCategoria(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la Categoría", "error");
    }
  };

  const handleSubmitCategoria = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${categoria.Id_Categoria}`, data);
        Swal.fire("Actualizado!", "La categoría ha sido actualizada.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "La categoría ha sido creada.", "success");
      }
      getAllCategoria();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setCategoria(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar la Categoría", "error");
    }
  };

  const deleteCategoria = async (Id_Categoria) => {
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
          await axios.delete(`${URI}${Id_Categoria}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllCategoria();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar la Categoría", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setCategoria(null);
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre Categoría', 'Acciones'];
  const data = categoriaList.map(categoria => [
    categoria.Id_Categoria,
    categoria.Nom_Categoria,
    <div key={categoria.Id_Categoria}>
      <button 
        className="btn btn-warning me-2" 
        onClick={() => getCategoria(categoria.Id_Categoria)}
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
        onClick={() => deleteCategoria(categoria.Id_Categoria)}
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

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>Gestionar Categorías</h1>
        </center>
        
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>   
            <img
              src="/plus-circle (1).svg" // Reemplaza con la ruta de tu icono de agregar
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }} // Color blanco
            />
            Registrar
          </button>
        </div>

        <WriteTable titles={titles} data={data} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setCategoria(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Categoría" : "Agregar Categoría"}
        >
          <FormCategoria 
            buttonForm={buttonForm}
            categoria={categoria}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitCategoria}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudCategoria;