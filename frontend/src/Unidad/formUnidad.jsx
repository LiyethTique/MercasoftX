import axios from "axios";
import { useState, useEffect } from "react";

const FormUnidad = ({ buttonForm, unidad, URI, updateTextButton }) => {
    const [Nom_Undidad, setNom_Unidad] = useState('')

    const sendForm = (e) => {
        e.preventDefault()

        if (buttonForm === 'Actualizar') {
            console.log('actualizando ando...')

            axios.put(URI + unidad.Id_Unidad, {
                Nom_Undidad: Nom_Undidad
            })
            updateTextButton('Enviar')
            clearForm()

        } else if (buttonForm === 'Enviar') {
            console.log('guardando ando...')

            axios.post(URI, {
                Nom_Undidad: Nom_Undidad
            })

            clearForm()
        }
    }

    const clearForm = () => {
        setNom_Unidad('')
    }

    const setData = () => {
        setNom_Unidad(unidad.Nom_Undidad)
    }

    useEffect(() => {
        setData()
    }, [unidad])

    return (
        <form id="unidadForm" action="" onSubmit={sendForm} className="table table-striped">
            <label htmlFor="nombreUnidad">Nombre de la iunidad</label>
            <input type="text" id="nombreUnidad" value={Nom_Undidad} onChange={(e) => setNom_Unidad(e.target.value)} />
            {/* Aquí colocas los demás campos */}
            <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
        </form>
    )
}

export default FormUnidad