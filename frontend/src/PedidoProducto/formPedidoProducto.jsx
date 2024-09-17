import axios from "axios";
import { useState, useEffect } from "react";

const FormPedidoProducto = ({ buttonForm, entity, URI, updateTextButton }) => {
    const [field1, setField1] = useState('')
    // Aquí colocas los demás campos

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
        setField1('')
        // Aquí reseteas los demás campos
    }

    const setData = () => {
        setField1(entity.field1)
        // Aquí configuras los demás campos
    }

    useEffect(() => {
        setData()
    }, [entity])

    return (
        <form id="entityForm" onSubmit={sendForm} className="table table-striped">
            <label htmlFor="field1">Campo 1</label>
            <input type="text" id="field1" value={field1} onChange={(e) => setField1(e.target.value)} />
            {/* Aquí colocas los demás campos */}
            <input type="submit" value={buttonForm} className="btn btn-success" />
        </form>
    )
}

export default FormPedidoProducto