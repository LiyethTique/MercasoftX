import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormUsuario from './formUsuario';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";

const URI = `${process.env.REACT_APP_SERVER_BACK}/users/`;
const URI_REGISTER = `${process.env.REACT_APP_SERVER_BACK}/auth/register/`

const CrudUsuario = () => {
  const [usuarioList, setUsuarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const moduleName = "Gestionar Usuarios"

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    getAllUsuarios();
  }, []);

  const getAllUsuarios = async () => {
    try {
      const response = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setUsuarioList(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsuarioList([]);
      }
    } catch (error) {
      console.error("Error fetching usuarios:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Usuarios", "error");
    }
  };

  const getUsuario = async (Id_Usuario) => {
    setButtonForm('Actualizar');
    try {
      const response = await axios.get(`${URI}${Id_Usuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsuario(response.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Usuario", "error");
    }
  };

  const handleSubmitUsuario = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${usuario.Id_Usuario}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire("Actualizado!", "El usuario ha sido actualizado.", "success");
      } else {
        await axios.post(URI_REGISTER, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire("Creado!", "El usuario ha sido creado.", "success");
      }
      getAllUsuarios();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setUsuario(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Usuario", "error");
    }
  };

  const deleteUsuario = async (Id_Usuario) => {
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
          await axios.delete(`${URI}${Id_Usuario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          Swal.fire("Borrado!", "El usuario ha sido borrado.", "success");
          getAllUsuarios();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al borrar el Usuario", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setUsuario(null);
    setIsModalOpen(true);
  };

  const titles = ['Codigo Usuario', 'Correo', 'Responsable ID', 'Acciones'];
  const data = usuarioList.map(usuario => [
    usuario.Id_Usuario,
    usuario.Cor_Usuario,
    usuario.Id_Responsable,
    <div className='botones-img' key={usuario.Id_Usuario} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <a
        href="#!"
        className="btn-custom me-2"
        onClick={() => getUsuario(usuario.Id_Usuario)}
        title="Editar"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <IoPencil size={20} color="blue" />
      </a>
      <a
        href="#!"
        className="btn-custom"
        onClick={() => deleteUsuario(usuario.Id_Usuario)}
        title="Borrar"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          onClose={() => { setIsModalOpen(false); setUsuario(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Usuario" : "Agregar Usuario"}
        >
          <FormUsuario
            buttonForm={buttonForm}
            usuario={usuario}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitUsuario}
            isEdit={buttonForm === 'Actualizar'} // Agregada esta línea
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudUsuario;
