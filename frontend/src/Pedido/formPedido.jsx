import axios from "axios";
import { useState, useEffect } from "react";

const FormPedido = ({ buttonForm, pedido, URI, updateTextButton, onSuccess }) => {
    const [fecPedido, setFecPedido] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [estPedido, setEstPedido] = useState('');
    const [valPedido, setValPedido] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                await axios.put(URI + pedido.Id_Pedido, {
                    Fec_Pedido: fecPedido,
                    Id_Cliente: idCliente,
                    Est_Pedido: estPedido,
                    Val_Pedido: valPedido
                });

                updateTextButton('Enviar');
                onSuccess(); // Notifica el éxito a CrudPedido
                clearForm();

            } else if (buttonForm === 'Enviar') {
                await axios.post(URI, {
                    Fec_Pedido: fecPedido,
                    Id_Cliente: idCliente,
                    Est_Pedido: estPedido,
                    Val_Pedido: valPedido
                });

                onSuccess(); // Notifica el éxito a CrudPedido
                clearForm();
            }
        } catch (error) {
            alert('Error al guardar el pedido');
        }
    };

    const clearForm = () => {
        setFecPedido('');
        setIdCliente('');
        setEstPedido('');
        setValPedido('');
    };

    useEffect(() => {
        if (pedido.Fec_Pedido) {
            setFecPedido(pedido.Fec_Pedido);
            setIdCliente(pedido.Id_Cliente);
            setEstPedido(pedido.Est_Pedido);
            setValPedido(pedido.Val_Pedido);
        }
    }, [pedido]);

    return (
        <>
            <form id="pedidoForm" action="" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="fecPedido">Fecha Pedido</label>
                <input
                    type="date"
                    id="fecPedido"
                    value={fecPedido}
                    required
                    onChange={(e) => setFecPedido(e.target.value)}
                />
                <br />

                <label htmlFor="idCliente">ID Cliente</label>
                <input
                    type="number"
                    id="idCliente"
                    value={idCliente}
                    required
                    onChange={(e) => setIdCliente(e.target.value)}
                />
                <br />

                <label htmlFor="estPedido">Estado Pedido</label>
                <input
                    type="text"
                    id="estPedido"
                    value={estPedido}
                    required
                    onChange={(e) => setEstPedido(e.target.value)}
                />
                <br />

                <label htmlFor="valPedido">Valor Pedido</label>
                <input
                    type="number"
                    id="valPedido"
                    value={valPedido}
                    step="0.01"
                    required
                    onChange={(e) => setValPedido(e.target.value)}
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

export default FormPedido;
