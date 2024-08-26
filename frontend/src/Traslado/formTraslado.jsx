import axios from "axios";
import { useState, useEffect } from "react";

const FormTraslado = ({ buttonForm, traslado, URI, updateTextButton }) => {
    const [Fec_Traslado, setFec_Traslado] = useState('')
    const [Des_Traslado, setDes_Traslado] = useState('')
    const [Id_Producto, setId_Producto] = useState('')
    const [Can_Producto, setCan_Producto] = useState('')
    const [Val_Unitario, setVal_Unitario] = useState('')
    const [Val_Trasaldo, setVal_Trasaldo] = useState('')
    const [Id_Responsable, setId_Responsable] = useState('')


    const sendForm = (e) => {
        e.preventDefault()

        if (buttonForm === 'Actualizar') {
            axios.put(URI + entity.Id_Entity, {
                field1: field1,
                // Aquí colocas los demás campos
            })
            updateTextButton('Enviar')
            clearForm()

        } else if (buttonForm === 'Enviar') {
            axios.post(URI, {
                field1: field1,
                // Aquí colocas los demás campos
            })
            clearForm()
        }
    }

    const clearForm = () => {
        Fec_Traslado('')
        Des_Traslado('')
        Id_Producto('')
        Can_Producto('')
        Val_Unitario('')
        Val_Trasaldo('')
        Id_Responsable('')
    }

    const setData = () => {
        setFec_Traslado(traslado.Fec_Traslado)
        setDes_Traslado(traslado.Des_Traslado)
        setId_Producto(traslado.Id_Producto)
        setCan_Producto(traslado.Can_Producto)
        setVal_Unitario(traslado.Val_Unitario)
        setVal_Trasaldo(traslado.Val_Trasaldo)
        setId_Responsable(traslado.Id_Responsable)
    }

    useEffect(() => {
        setData()
    }, [traslado])

    return (
        <>
            <form id="trasladoForm" action="" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="fecTrasaldo">Fecha del traslado</label>
                <input type="date" id="fecTrasaldo" value={Fec_Traslado} required onChange={(e) => setFec_Traslado(e.target.value)} />
                <br />

                <label htmlFor="descripcionTraslado">Descripcion del traslado</label>
                <input type="text" id="descripcionTraslado" value={Des_Traslado} required onChange={(e) => setDes_Traslado(e.target.value)} />
                <br />

                <label htmlFor="codigoProducto">Codigo del producto</label>
                <input type="number" id="codigoProducto" value={Id_Producto} required onChange={(e) => setId_Producto(e.target.value)} />
                <br />

                <label htmlFor="cantidadProducto">Cantidad del producto</label>
                <input type="number" id="cantidadProducto" value={Can_Producto} required onChange={(e) => setCan_Producto(e.target.value)} />
                <br />

                <label htmlFor="valorUnitario">Valor unitario del producto</label>
                <input type="number" id="valorUnitario" value={Val_Unitario} required onChange={(e) => setVal_Unitario(e.target.value)} />
                <br />

                <label htmlFor="valorTrasaldo">Valor total del traslado</label>
                <input type="number" id="valorTrasaldo" value={Val_Trasaldo} required onChange={(e) => setVal_Trasaldo(e.target.value)} />
                <br />

                <label htmlFor="codigoResponsable">Codigo del responsable</label>
                <input type="number" id="codigoResponsable" value={Id_Responsable} required onChange={(e) => setId_Responsable(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />

            </form>
        </>
    )
}

export default FormTraslado