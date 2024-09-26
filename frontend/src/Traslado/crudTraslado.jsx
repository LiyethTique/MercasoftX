import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormTraslado from './formTraslado';  // Form component for Traslados
import Sidebar from '../Sidebar/Sidebar';
import WriteTable from '../Tabla/Data-Table';  // Assuming you have a Data-Table component
import ModalForm from '../Model/Model';  // Assuming a Modal component is available
import AlertaBDVacia from '../alertas/alertaBDVacia.jsx'
import './crudTraslados.css';

const URI = process.env.REACT_APP_SERVER_BACK + '/traslado/';

const CrudTraslado = () => {
  const [trasladoList, setTrasladoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traslado, setTraslado] = useState(null);
  const [originalTraslado, setOriginalTraslado] = useState(null);  // New state to hold the original traslado

  useEffect(() => {
    getAllTraslado();
  }, []);

  const getAllTraslado = async () => {
    try {
      const response = await axios.get(URI);
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setTrasladoList([]);
        } else {
          setTrasladoList(response.data);
        }
      } else {
        console.error("Unexpected response format:", response.data);
        setTrasladoList([]);
      }
    } catch (error) {
      console.error("Error fetching traslados:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los traslados", "error");
    }
  };

  const getTraslado = async (Id_Traslado) => {
    console.log("Id_Traslado:", Id_Traslado);
    setButtonForm('Actualizar');
    try {
      const response = await axios.get(`${URI}${Id_Traslado}`);
      setOriginalTraslado(response.data);  // Set the original traslado
      setTraslado(response.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el traslado", "error");
    }
  };

  const handleSubmitTraslado = async (data) => {
    if (buttonForm === 'Actualizar') {
      if (JSON.stringify(data) === JSON.stringify(originalTraslado)) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención.',
          text: 'Por favor, realice al menos una modificación antes de actualizar.',
        });
        return;
      }
    }

    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${traslado.Id_Traslado}`, data);
        Swal.fire("Actualizado!", "El traslado ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El traslado ha sido creado.", "success");
      }
      getAllTraslado();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setTraslado(null);
      setOriginalTraslado(null);  // Clear the original traslado
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el traslado", "error");
    }
  };

  const deleteTraslado = async (Id_Traslado) => {
    console.log("Deleting traslado with ID:", Id_Traslado);
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
          await axios.delete(`${URI}${Id_Traslado}`);
          Swal.fire("¡Borrado!", "El traslado ha sido borrado.", "success");
          getAllTraslado();  // Refresh the list after deletion
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el traslado", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setTraslado(null);
    setOriginalTraslado(null);  // Clear the original traslado when opening the form
    setIsModalOpen(true);
  };

  const titles = ['Codigo Traslado', 'Fecha Traslado', 'Descripción', 'Producto', 'Cantidad', 'Valor Unitario', 'Valor Total', 'Responsable', 'Acciones'];
  const data = trasladoList.map(traslado => [
    traslado.Id_Traslado,
    traslado.Fec_Traslado,
    traslado.Des_Traslado,
    traslado.Id_Producto ? traslado.producto?.Nom_Producto || 'Sin Producto' : 'Sin Producto',
    traslado.Can_Producto,
    traslado.Val_Unitario,
    traslado.Val_Traslado,
    traslado.Id_Responsable ? traslado.responsable?.Nom_Responsable || 'Sin Responsable' : 'Sin Responsable',
    <div key={traslado.Id_Traslado}>
      <a
        href="#!"
        className="btn-custom me-2"
        onClick={() => getTraslado(traslado.Id_Traslado)}
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
        onClick={() => deleteTraslado(traslado.Id_Traslado)}
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
          <h1>Gestionar Traslados</h1>
        </center>

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

        <AlertaBDVacia uri={URI} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setTraslado(null); setButtonForm('Enviar'); setOriginalTraslado(null); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Traslado" : "Agregar Traslado"}
        >
          <FormTraslado
            buttonForm={buttonForm}
            traslado={traslado}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitTraslado}
          />
        </ModalForm>

      </div>
    </>
  );
};

export default CrudTraslado;