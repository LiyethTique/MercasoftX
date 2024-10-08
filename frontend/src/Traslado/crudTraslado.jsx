import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormTraslado from '../Traslado/formTraslado';
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Model/Model';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { IoTrash, IoPencil } from "react-icons/io5";
import WriteTable from '../Tabla/Data-Table';

const URI = process.env.REACT_APP_SERVER_BACK + '/traslado/';

const CrudTraslado = () => {
  const [trasladoList, setTrasladoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traslado, setTraslado] = useState(null);
  const [formData, setFormData] = useState({}); // Para manejar el estado del formulario
  const moduleName = "Gestionar Traslado"

  useEffect(() => {
    const fetchTraslados = async () => {
      try {
        const respuesta = await axios.get(URI);
        if (Array.isArray(respuesta.data)) {
          setTrasladoList(respuesta.data);
        } else {
          console.error("Formato de respuesta inesperado:", respuesta.data);
          setTrasladoList([]);
        }
      } catch (error) {
        console.error("Error al obtener traslados:", error);
        setTrasladoList([]);
      }
    };
    fetchTraslados();
  }, []);

  const getTraslado = async (Id_Traslado) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Traslado}`);
      setTraslado(respuesta.data);
      setFormData(respuesta.data); // Inicializar el estado del formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el traslado:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del traslado.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hasChanges = (data) => {
    return Object.keys(data).some(key =>
      data[key] !== traslado[key]
    );
  };

  const hasSpaces = (data) => {
    return Object.values(data).some(value =>
      typeof value === 'string' && value.trim() === ''
    );
  };

  const handleSubmitTraslado = async () => {
    if (hasSpaces(formData)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se permiten campos vacíos o que contengan solo espacios.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (buttonForm === 'Actualizar' && !hasChanges(formData)) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin cambios',
        text: 'Debes realizar cambios en al menos un campo para actualizar.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${traslado.Id_Traslado}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El traslado se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await axios.post(URI, formData);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El traslado se ha registrado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
      }
      const respuesta = await axios.get(URI);
      setTrasladoList(Array.isArray(respuesta.data) ? respuesta.data : []);
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setTraslado(null);
      setFormData({}); // Reiniciar el estado del formulario
    } catch (error) {
      console.error("Error al guardar el traslado:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar el traslado.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const deleteTraslado = async (Id_Traslado) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este traslado?")) {
      try {
        await axios.delete(`${URI}${Id_Traslado}`);
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
          text: 'El traslado se ha eliminado exitosamente.',
          confirmButtonText: 'Aceptar',
        });
        const respuesta = await axios.get(URI);
        setTrasladoList(Array.isArray(respuesta.data) ? respuesta.data : []);
      } catch (error) {
        console.error("Error al eliminar el traslado:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al eliminar el traslado.',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setTraslado(null);
    setFormData({}); // Reiniciar el estado del formulario
    setIsModalOpen(true);
  };

  const titles = [
    'Id Traslado',        // Codigo (correspondiente a Id_Traslado)
    'Descripción',        // Descripción (correspondiente a Dcp_Traslado)
    'Fecha',              // Fecha (correspondiente a Fec_Traslado)
    'Origen',             // Origen (correspondiente a Ori_Traslado)
    'Destino',            // Destino (correspondiente a Des_Traslado)
    'Unidad de Medida',   // Unidad de Medida (correspondiente a Uni_DeMedida)
    'ID Producto',        // ID Producto (correspondiente a Id_Producto)
    'Cantidad',           // Cantidad (correspondiente a Can_Producto)
    'Valor Unitario',     // Valor Unitario (correspondiente a Val_Unitario)
    'ID Responsable',      // ID Responsable (correspondiente a Id_Responsable)
    'Acciones'           // Acciones
  ];

  const data = trasladoList.length === 0
    ? [[
      '', '', '', ''
    ]]
    : trasladoList.map(trasladoItem => [
      trasladoItem.Id_Traslado,
      trasladoItem.Dcp_Traslado,
      trasladoItem.Fec_Traslado,
      <div key={trasladoItem.Id_Traslado} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#!"
          className="btn-custom me-2"
          onClick={() => getTraslado(trasladoItem.Id_Traslado)}
          title="Editar"
          style={{ pointerEvents: trasladoList.length > 0 ? 'auto' : 'none', opacity: trasladoList.length > 0 ? 1 : 0.5 }}
        >
          <IoPencil size={20} color="blue" />
        </a>
        <a
          href="#!"
          className="btn-custom"
          onClick={() => deleteTraslado(trasladoItem.Id_Traslado)}
          title="Borrar"
          style={{ pointerEvents: trasladoList.length > 0 ? 'auto' : 'none', opacity: trasladoList.length > 0 ? 1 : 0.5 }}
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
          onClose={() => { setIsModalOpen(false); setTraslado(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Traslado" : "Agregar Traslado"}
        >
          <FormTraslado
            buttonForm={buttonForm}
            traslado={traslado}
            onSubmit={handleSubmitTraslado}
            onInputChange={handleInputChange} // Manejar cambios en el formulario
            formData={formData} // Pasar el estado del formulario
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudTraslado;
