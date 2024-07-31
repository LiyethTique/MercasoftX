import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormProyecto from './FormProyecto'

import Swal from 'sweetalert2'
import FormQueryproyecto from './FormQueryproyecto'

const URI = 'http://localhost:7000/responsables/'

const CrudMercasoft = () => {

    const [responseList, setResponseList] = useState([])

    const [buttonForm, setButtonForm] = useState('Enviar')

    const [response, setresponse] = useState({
        id: '',
        Documento: '',
        Nombres: '',
        Apellidos: '',
        Telefono: '',
        Correo: '',
        Tip_responsable: '',
        Genero: ''
    })

    useEffect(() => {
        getAllproyecto()
    }, [responseList ])

    const getAllproyecto = async () => {
        const respuesta = await axios.get(URI)
        
        setResponseList(respuesta.data)
    }

    const getproyecto = async (idresponse) => {

        setButtonForm('Enviar')
        const respuesta = await axios.get(  URI + idresponse)

        setButtonForm('Actualizar')

        

        setresponse({
            ...respuesta.data
        })
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteproyecto = (idresponse) => {
        Swal.fire({
            title: "Estas Seguro?",
            text: "No podras revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + idresponse)
              Swal.fire({
                title: "Borrado!",
                text: "El registro ha sido borrado.",
                icon: "success"
              });
            }
          });
    }


    return (
        <>
            <table>
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

                    {responseList.map((response) => (
                        <tr key={response.id}>
                            <td>{response.Documento}</td>
                            <td>{response.Nombres}</td>
                            <td>{response.Apellidos}</td>
                            <td>{response.Telefono}</td>
                            <td>{response.Correo}</td>
                            <td>{response.Tip_responsable}</td>
                            <td>{response.Genero}</td>
                            <td>
                                <button onClick={() => getproyecto(response.id)}>Editar</button>
                                <button onClick={() => deleteproyecto(response.id)}>Borrar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            { }
            <FormProyecto buttonForm={buttonForm} response={response} URI={URI} updateTextButton={updateTextButton} />
            <hr/>
            <FormQueryproyecto URI={URI} getproyecto={getproyecto} deleteproyecto={deleteproyecto} buttonForm={buttonForm} />
        </>
    )

}

export default CrudMercasoft