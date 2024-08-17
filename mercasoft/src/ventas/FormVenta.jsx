import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormVenta = ({ buttonForm, venta, URI, updateTextButton }) => {
    const [Fec_Venta, setFecha] = useState(venta.Fec_Venta || '');
    const [Can_Venta, setCantidad] = useState(venta.Can_Venta || '');
    const [Val_Venta, setValor] = useState(venta.Val_Venta || '');
    const [Id_Pedido, setPedido] = useState(venta.Id_Pedido || '');
    
    const sendForm = (e) => {
        e.preventDefault();

        if (buttonForm === 'Actualizar') {
            console.log('actualizando ando como el calvo...');

            axios.put(`${URI}${venta.Id_Venta}`, {
                Fec_Venta: Fec_Venta,
                Can_Venta: Can_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            })
            .then(response => {
                updateTextButton('Enviar');
                clearForm();
            })
            .catch(error => {
                console.error("Error updating venta:", error);
                Swal.fire({
                    title: "Error de Servidor",
                    text: error.response ? error.response.data.message : "No se recibió respuesta del servidor. Inténtelo nuevamente.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });

        } else if (buttonForm === 'Enviar') {
            console.log('guardando ando...');
            axios.post(URI, {
                Fec_Venta: Fec_Venta,
                Can_Venta: Can_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            })
            .then(response => {
                clearForm();
            })
            .catch(error => {
                console.error("Error creating venta:", error);
                Swal.fire({
                    title: "Error de Servidor",
                    text: error.response ? error.response.data.message : "No se recibió respuesta del servidor. Inténtelo nuevamente.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
        }
    };

    const clearForm = () => {
        setFecha('');
        setCantidad('');
        setValor('');
        setPedido('');
    };

    const setData = () => {
        setFecha(venta.Fec_Venta || '');
        setCantidad(venta.Can_Venta || '');
        setValor(venta.Val_Venta || '');
        setPedido(venta.Id_Pedido || '');
    };

    useEffect(() => {
        setData();
    }, [venta]);

    return (
        <form id="ventaForm" onSubmit={sendForm} className="flex justify-center items-center min-h-screen bg-background">
            <label htmlFor="fechaVenta">Fecha Venta</label>
            <input type="date" id="fechaVenta" value={Fec_Venta} onChange={(e) => setFecha(e.target.value)} />
            <br />

            <label htmlFor="canVenta">Cantidad Venta</label>
            <input type="number" id="canVenta" value={Can_Venta} onChange={(e) => setCantidad(e.target.value)} />
            <br />

            <label htmlFor="valorVenta">Valor Venta</label>
            <input type="number" id="valorVenta" value={Val_Venta} onChange={(e) => setValor(e.target.value)} />
            <br />

            <label htmlFor="Id_Pedido">Codigo Pedido</label>
            <input type="number" id="Id_Pedido" value={Id_Pedido} onChange={(e) => setPedido(e.target.value)} />
            <br />

            <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
        </form>
    );
};

export default FormVenta;


