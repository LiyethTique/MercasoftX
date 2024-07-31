import axios from "axios";
import { useEffect, useState } from "react"

const FormQueryproyecto = ({ URI, getproyecto, deleteproyecto, buttonForm }) => {
    const [responsables, setResponsables] = useState([])
    const [Documento, setDocumento] = useState('')

    const sendFormQuery = async (Documento) => {

        // console.log(Documento)
        
            if (Documento) {
                const respuesta = await axios.get(URI + 'Documento/' + Documento)
                setResponsables(respuesta.data
                )
            } else {
                setResponsables([])
            }
        }
       

    useEffect(() => {
        setResponsables([])
        setDocumento('')

    }, [buttonForm]);

    return (
        <>
            <form id="queryForm">
                <label htmlFor="DocumentoQuery">Documento</label>
                <input
                    type="number"
                    id="DocumentoQuery"
                    value={Documento}
                    onChange={(e) => {
                        sendFormQuery(e.target.value);
                        setDocumento(e.target.value) }} />
            </form>

            {responsables.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Tip_responsable</th>
                            <th>Genero</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsables.map((responsable) => (
                            <tr key={responsable.id}>
                                <td>{responsable.Documento}</td>
                                <td>{responsable.Nombres}</td>
                                <td>{responsable.Apellidos}</td>
                                <td>{responsable.Telefono}</td>
                                <td>{responsable.Correo}</td>
                                <td>{responsable.Tip_responsable}</td>
                                <td>{responsable.Genero}</td>
                                <td>
                                    <button onClick={() => getproyecto(responsable.id)}>Editar</button>
                                    <button onClick={() => deleteproyecto(responsable.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : ''
             }
        </>
    )
}

export default FormQueryproyecto
