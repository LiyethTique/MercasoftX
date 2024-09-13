import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormVenta from './formVenta'; // Adaptamos el nombre
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = process.env.REACT_APP_SERVER_BACK  + '/venta/'; // Ruta de ventas

const CrudVenta = () => {
  const [ventaList, setVentaList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venta, setVenta] = useState(null);

  useEffect(() => {
    getAllVenta();
  }, []);

  const getAllVenta = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setVentaList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setVentaList([]);
      }
    } catch (error) {
      console.error("Error fetching ventas:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener las Ventas", "error");
    }
  };

  const getVenta = async (Id_Venta) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Venta}`);
      setVenta(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener la Venta", "error");
    }
  };

  const handleSubmitVenta = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${venta.Id_Venta}`, data);
        Swal.fire("Actualizado!", "La venta ha sido actualizada.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "La venta ha sido creada.", "success");
      }
      getAllVenta();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setVenta(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar la Venta", "error");
    }
  };

  const deleteVenta = async (Id_Venta) => {
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
          await axios.delete(`${URI}${Id_Venta}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllVenta();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar la Venta", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setVenta(null);
    setIsModalOpen(true);
  };

  const titles = ['Codigo de Venta', 'Fecha de la Venta', 'Valor de la Venta', 'Valor del Pedido', 'Acciones'];
  const data = ventaList.map(venta => [
    venta.Id_Venta,
    venta.Fec_Venta,
    venta.Val_Venta,
    venta.pedido ? venta.pedido.Val_Pedido : 'Sin pedido',
    <div key={venta.Id_Venta}>
      <button 
                className="btn btn-warning me-2" 
                onClick={() => getVenta(venta.Id_Venta)}
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
                onClick={() => deleteVenta(venta.Id_Venta)}
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
          <h1>Gestionar Ventas</h1>
        </center>
        
        {/* Botón para abrir el modal */}
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>   
             <img
             src="/plus-circle (1).svg"
             alt="Add Icon"
             style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
           />
            Registrar Venta
          </button>
        </div>

        {/* Tabla de datos */}
        <WriteTable titles={titles} data={data} />

        {/* Modal Reutilizable */}
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setVenta(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Venta" : "Agregar Venta"}
        >
          <FormVenta 
            buttonForm={buttonForm}
            venta={venta}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitVenta}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudVenta;
