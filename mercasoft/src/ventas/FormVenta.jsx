import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const FormVenta = ({buttonForm, venta, URI, updateTextButton}) => {
    const [Fec_Venta, setFecha] = useState('')
    const [Can_Venta, setCantidad] = useState('')
    const [Val_Venta, setValor] = useState('')

    const sendForm = (e) => {
        e.preventDefault()

        if(buttonForm == 'Actualizar'){
            console.log('actualizando ando...')

            axios.put(URI + venta.id, {
                Fec_Venta: Fec_Venta,
                Can_Venta: Can_Venta,
                Val_Venta: Val_Venta
            })

            updateTextButton('Enviar')
            clearForm()

        } else if (buttonForm == 'Enviar'){
            console.log('guardando ando...')
            axios.post(URI, {
                Fec_Venta: Fec_Venta,
                Can_Venta: Can_Venta,
                Val_Venta: Val_Venta
            })

            clearForm()
        }
    }
    const clearForm =() => {
        setFecha('')
        setCantidad('')
        setValor('')    
    }
    const setData = () => {
        setFecha(venta.Fec_Venta)
        setCantidad(venta.Can_Venta)
        setValor(venta.Val_Venta)
    }

    useEffect(() =>{
        setData()

    }, [venta])

    return (
        <>
            <form id="ventaForm" action="" onSubmit={sendForm} class="table table-striped">
            <label htmlFor="fechaVenta">Fecha Venta</label>
            <input type="date" id="fechaVenta" value={Fec_Venta} onChange={(e) => setFecha(e.target.value)} />
            <br />

            <label htmlFor="canVenta">Cantidad Venta</label>
            <input type="number" id="canVenta" value={Can_Venta} onChange={(e) => setCantidad(e.target.value)}/>
            <br />

            <label htmlFor="valorVenta"> Valor Venta</label>
            <input type="number" id="valorVenta" value={Val_Venta} onChange={(e) => setValor(e.target.value)}/>
            <br />
            <input class="btn btn-warning" type="submit" id="boton" value={buttonForm} className="btn btn-success" />

            </form>
        </>
    )

}
export default FormVenta