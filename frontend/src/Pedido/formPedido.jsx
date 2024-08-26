import { useState } from "react";
import { useEffect } from "react";

const FormPedido = ({ buttonForm, pedido, updateTextButton }) => {

    const [Fec_Pedido, setFec_Pedido] = useState('')
    const [Id_Cliente, setId_Cliente] = useState('')
    const [Est_Pedido, setEst_Pedido] = useState('')
    const [Val_Pedido, setVal_Pedido] = useState('')

    const sendForm = (e) => {

        e.preventDefault();

        if (buttonForm == 'Actualizar') {
            console.log('actualizando ando...')

            const respuesta = axios.put(URI + pedido.Id_Pedido, {
                Fec_Pedido: Fec_Pedido,
                Id_Cliente: Id_Cliente,
                Est_Pedido: Est_Pedido,
                Val_Pedido: Val_Pedido
            })
            if (respuesta.status == 201) {
                updateTextButton('Enviar')
                clearForm()
            }
        } else if (buttonForm == 'Enviar') {
            console.log('guardando ando...')

            const respuesta = axios.post(URI, {
                Fec_Pedido: Fec_Pedido,
                Id_Cliente: Id_Cliente,
                Est_Pedido: Est_Pedido,
                Val_Pedido: Val_Pedido
            })
            if (respuesta.status == 201) {
                clearForm()
            }
        }

    }

    const clearForm = () => {
        setFec_Pedido('');
        setId_Cliente('');
        setEst_Pedido('');
        setVal_Pedido('');
    };

    const setData = () => {
        setFec_Pedido(pedido.Fec_Pedido);
        setId_Cliente(pedido.Id_Cliente);
        setEst_Pedido(pedido.Est_Pedido);
        setVal_Pedido(pedido.Val_Pedido);
    };

    useEffect(() => {
        setData()
    }), [pedido]

    return (
        <>
            <form id="pedidoForm" action="" onSubmit={sendForm}>
                <label htmlFor="Fec_Pedido">Fecha del pedido</label>
                <input type="date" id="Fec_Pedido" value={Fec_Pedido} onChange={(e) => setFec_Pedido(e.target.value)} />
                <br />
                <label htmlFor="Id_Cliente">Nombre del cliente</label>
                <input type="text" id="Id_Cliente" value={Id_Cliente} onChange={(e) => setId_Cliente(e.target.value)} />
                <br />
                <label htmlFor="Est_Pedido">Nombre de la unidad</label>
                <input type="text" id="Est_Pedido" value={Est_Pedido} onChange={(e) => setEst_Pedido(e.target.value)} />
                <br />
                <label htmlFor="Val_Pedido">Nombre del producto</label>
                <input type="text" id="Val_Pedido" value={Val_Pedido} onChange={(e) => setVal_Pedido(e.target.value)} />

                <input type="text" id="boton" value={buttonForm} className="btn btn-success" readOnly />
            </form>
        </>
    )
}

export default FormPedido