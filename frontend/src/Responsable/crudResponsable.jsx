import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormResponsable from '../Responsable/formResponsable';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = (process.env.SERVER_BACK || 'http://localhost:3001') + '/responsable/';

const CrudResponsable = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    getAllResponsable();
  }, []);

  const getAllResponsable = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setResponsableList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setResponsableList([]);
      }
    } catch (error) {
      console.error("Error fetching responsables:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Responsables", "error");
    }
  };

  const getResponsable = async (Id_Responsable) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Responsable}`);
      setResponsable(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Responsable", "error");
    }
  };

  const handleSubmitResponsable = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${responsable.Id_Responsable}`, data);
        Swal.fire("Actualizado!", "El responsable ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El responsable ha sido creado.", "success");
      }
      getAllResponsable();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setResponsable(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Responsable", "error");
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
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
          await axios.delete(`${URI}${Id_Responsable}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllResponsable();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Responsable", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setResponsable(null);
    setIsModalOpen(true);
  };

  const titles = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Tipo Responsable', 'Género', 'Acciones'];
  const data = responsableList.map(responsable => [
    responsable.Id_Responsable,
    responsable.Nom_Responsable,
    responsable.Cor_Responsable,
    responsable.Tel_Responsable,
    responsable.Tip_Responsable,
    responsable.Tip_Genero,
    <div key={responsable.Id_Responsable}>
      <button 
                className="btn btn-warning me-2" 
                onClick={() => getResponsable(responsable.Id_Responsable)}
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
                onClick={() => deleteResponsable(responsable.Id_Responsable)}
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
          <h1>Gestionar Responsables</h1>
        </center>
        
        {/* Botón para abrir el modal */}
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

        {/* Tabla de datos */}
        <WriteTable titles={titles} data={data} />

        {/* Modal Reutilizable */}
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setResponsable(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Responsable" : "Agregar Responsable"}
        >
          <FormResponsable 
            buttonForm={buttonForm}
            responsable={responsable}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitResponsable}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudResponsable;
