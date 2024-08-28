import axios from "axios";
import { useState, useEffect } from "react";
import "../css/estilos.css"

const FormVenta = ({ buttonForm, venta, URI, updateTextButton }) => {
    const [Fec_Venta, setFechaVenta] = useState('');
    const [Val_Venta, setValorVenta] = useState('');
    const [Id_Pedido, setIdPedido] = useState('');

    const sendForm = (e) => {
        e.preventDefault();

        if (buttonForm === 'Actualizar') {
            console.log('Actualizando venta...');

            axios.put(URI + venta.Id_Venta, {
                Fec_Venta: Fec_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            });

            updateTextButton('Enviar');
            clearForm();

        } else if (buttonForm === 'Enviar') {
            console.log('Guardando venta...');
            axios.post(URI, {
                Fec_Venta: Fec_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            });

            clearForm();
        }
    };

    const clearForm = () => {
        setFechaVenta('');
        setValorVenta('');
        setIdPedido('');
    };

    const setData = () => {
        setFechaVenta(venta.Fec_Venta || '');
        setValorVenta(venta.Val_Venta || '');
        setIdPedido(venta.Id_Pedido || '');
    };

    useEffect(() => {
        setData();
    }, [venta]);

    return (
        <>
            <form id="ventaForm" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="fechaVenta">Fecha de Venta</label>
                <input
                    type="date"
                    id="fechaVenta"
                    value={Fec_Venta}
                    onChange={(e) => setFechaVenta(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="valorVenta">Valor de la Venta</label>
                <input
                    type="number"
                    id="valorVenta"
                    value={Val_Venta}
                    onChange={(e) => setValorVenta(e.target.value)}
                    step="0.01"
                    required
                />
                <br />

                <label htmlFor="idPedido">ID del Pedido</label>
                <input
                    type="number"
                    id="idPedido"
                    value={Id_Pedido}
                    onChange={(e) => setIdPedido(e.target.value)}
                    required
                />
                <br />

                <input
                    type="submit"
                    id="boton"
                    value={buttonForm}
                    className="btn btn-success"
                />
            </form>
        </>
    );
};

export default FormVenta;
