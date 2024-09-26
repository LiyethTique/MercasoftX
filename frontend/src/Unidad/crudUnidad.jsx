import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import FormUnidad from '../Unidad/formUnidad';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table'; 
import ModalForm from '../Model/Model';
import './crudUnidad.css';  // Asegúrate de que este archivo esté en la ubicación correcta

const URI = process.env.REACT_APP_SERVER_BACK + '/unidad/';

const CrudUnidad = () => {
  const [unidadList, setUnidadList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unidad, setUnidad] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // Nueva variable de estado para el mensaje

  useEffect(() => {
    getAllUnidades();
  }, []);

  const getAllUnidades = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setUnidadList(respuesta.data);
        setShowMessage(respuesta.data.length === 0); // Mostrar mensaje si no hay unidades
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setUnidadList([]);
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error fetching unidades:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener las Unidades", "error");
      setShowMessage(true); // Mostrar mensaje en caso de error
    }
  };

  const getUnidad = async (Id_Unidad) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Unidad}`);
      setUnidad(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la Unidad", "error");
    }
  };

  const handleSubmitUnidad = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${unidad.Id_Unidad}`, data);
        Swal.fire("Actualizado!", "La unidad ha sido actualizada.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "La unidad ha sido creada.", "success");
      }
      getAllUnidades();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setUnidad(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar la Unidad", "error");
    }
  };

  const deleteUnidad = async (Id_Unidad) => {
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
          await axios.delete(`${URI}${Id_Unidad}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");

          // Actualizar la lista de unidades sin el registro eliminado
          const updatedUnidades = unidadList.filter(unidad => unidad.Id_Unidad !== Id_Unidad);
          setUnidadList(updatedUnidades);
          setShowMessage(updatedUnidades.length === 0); // Mostrar mensaje si no hay unidades

        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar la Unidad", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setUnidad(null);
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre Unidad', 'Acciones'];
  const data = unidadList.map(unidad => [
    unidad.Id_Unidad,
    unidad.Nom_Unidad,
    <div key={unidad.Id_Unidad}>
      <a 
        href="#!"
        className="btn-custom me-2"
        onClick={() => getUnidad(unidad.Id_Unidad)}
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
        onClick={() => deleteUnidad(unidad.Id_Unidad)}
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
          <h1>Gestionar Unidades</h1>
        </center>

        {showMessage && (
          <div className="alert alert-warning text-center" role="alert">
            No hay Unidades Registradas en la Base de Datos
          </div>
        )}

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
          onClose={() => { setIsModalOpen(false); setUnidad(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Unidad" : "Agregar Unidad"}
        >
          <FormUnidad 
            buttonForm={buttonForm}
            unidad={unidad}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitUnidad}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudUnidad;
