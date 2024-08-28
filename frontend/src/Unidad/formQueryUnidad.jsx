import axios from "axios"
import { useEffect, useState } from "react"

const FormQueryUnidad = ({ URI, getUnidad, deleteUnidad, buttonForm }) => {
    const [unidadQuery, setUnidadQuery] = useState([])
    const [Id_Unidad, setId_Unidad] = useState('')

    const sendFormQuery = async (Id_Unidad) => {
        if (Id_Unidad) {
            const respuesta = await axios.get(URI + 'consulta/' + Id_Unidad)
            setUnidadQuery(respuesta.data)
        } else {
            setUnidadQuery([])
        }
    }

    useEffect(() => {
        setUnidadQuery([])
        setId_Unidad('')
    }, [buttonForm])

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="idQuery">Nombre de la unidad</label>
                <br />
                <input type="text" id="idQuery" value={Id_Unidad} onChange={(e) => { sendFormQuery(e.target.value); setId_Unidad(e.target.value) }} />
            </form>
            {
                unidadQuery.length > 0 ? <table>
                        <thead>
                            <tr>
                                <th>Codigo de la unidad</th>
                                <th>Nombre de la unidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unidadQuery.map((unidad) => (
                                <tr key={unidad.Id_Unidad}>
                                    <td>{unidad.Id_Unidad}</td>
                                    <td>{unidad.Nom_Unidad}</td>
                                    <td>
                                        <button onClick={() => getUnidad(unidad.Id_Unidad)}>Editar</button>
                                        <button onClick={() => deleteUnidad(unidad.Id_Unidad)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''
            }
        </>
    )
}

            export default FormQueryUnidad