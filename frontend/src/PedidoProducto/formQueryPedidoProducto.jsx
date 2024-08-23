import axios from "axios"
import { useEffect, useState } from "react"

const FormQueryPedidoProducto = ({ URI, getEntity, deleteEntity, buttonForm }) => {
    const [entityQuery, setEntityQuery] = useState([])
    const [id, setId] = useState('')

    const sendFormQuery = async (id) => {
        if (id) {
            const respuesta = await axios.get(URI + 'consulta/' + id)
            setEntityQuery(respuesta.data)
        } else {
            setEntityQuery([])
        }
    }

    useEffect(() => {
        setEntityQuery([])
        setId('')
    }, [buttonForm])

    return (
        <>
            <form id="queryForm">
                <label htmlFor="idQuery">Código</label>
                <input type="number" id="idQuery" value={id} onChange={(e) => { sendFormQuery(e.target.value); setId(e.target.value) }} />
            </form>
            {
                entityQuery.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            {/* Aquí colocas los demás encabezados */}
                        </tr>
                    </thead>
                    <tbody>
                        {entityQuery.map((entity) => (
                            <tr key={entity.Id_Entity}>
                                <td>{entity.Id_Entity}</td>
                                {/* Aquí colocas los demás datos */}
                                <td>
                                    <button onClick={() => getEntity(entity.Id_Entity)}>Editar</button>
                                    <button onClick={() => deleteEntity(entity.Id_Entity)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default FormQueryPedidoProducto