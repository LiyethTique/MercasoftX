import axios from "axios";
import { useState, useEffect} from "react";

const FormVenta = ({ buttonForm, venta, URI, updateTextButton }) => {
    const [Fec_Venta, setFecha] = useState('')
    const [Val_Venta, setValor] = useState('')
    const [Id_Pedido, setId_Pedido] = useState('')

    const sendForm = (e) => {
        e.preventDefault()

        if (buttonForm == 'Actualizar') {
            console.log('actualizando ando...')

            axios.put(URI + venta.Id_Venta, {
                Fec_Venta: Fec_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            })

            updateTextButton('Enviar')
            clearForm()

        } else if (buttonForm == 'Enviar') {
            console.log('guardando ando...')

            axios.post(URI, {
                Fec_Venta: Fec_Venta,
                Val_Venta: Val_Venta,
                Id_Pedido: Id_Pedido
            })

            clearForm()
            sendForm()
        }
    }
    const clearForm = () => {
        setFecha('')
        setValor('')
        setId_Pedido('')
    }
    const setData = () => {
        setFecha(venta.Fec_Venta)
        setValor(venta.Val_Venta)
        setId_Pedido(venta.Id_Pedido)
    }

    useEffect(() => {
        setData()
    }, [venta])

    return (
        <>
            <form id="ventaForm" action="" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="fechaVenta">Fecha Venta</label>
                <input type="date" id="fechaVenta" value={Fec_Venta} required onChange={(e) => setFecha(e.target.value)} />
                <br />

                <label htmlFor="valorVenta">Valor Venta</label>
                <input type="number" id="valorVenta" value={Val_Venta} required onChange={(e) => setValor(e.target.value)} />
                <br />

                <label htmlFor="codigoPedido">Codigo del pedido</label>
                <input type="number" id="codigoPedido" value={Id_Pedido} required onChange={(e) => setId_Pedido(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />

            </form>
        </>
    )

}
export default FormVenta