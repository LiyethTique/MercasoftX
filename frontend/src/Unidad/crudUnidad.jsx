import axios from 'axios'
import { useState, useEffect } from 'react'
import FormUnidad from './formUnidad'
import FormQueryUnidad from './formQueryUnidad'
import Sidebar from '../Sidebar/Sidebar'

import Swal from 'sweetalert2'

const URI = process.env.SERVER_BACK + '/unidad/' // Ajusta la URI

const CrudUndiad = () => {

    const [unidadList, setUnidadList] = useState([])

    const [buttonForm, setButtonForm] = useState('Enviar')

    const [unidad, setUnidad] = useState({
        Id_Unidad:'',
        Nom_Unidad: ''
    })

    useEffect(() => {
        getAllUnidad()
    }, [])

    const getAllUnidad = async () => {
        try {
            const respuesta = await axios.get(URI)
            setUnidadList(Array.isArray(respuesta.data) ? respuesta.data : [])
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener las unidades")
        }
    }

    const getUnidad = async (Id_Unidad) => {
        setButtonForm('Actualizar')
        console.log('Id_Unidad' + Id_Unidad)
        const respuesta = await axios.get(URI + Id_Unidad)
        console.log(respuesta.data)
        setUnidad({
            ...respuesta.data
        })
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteUnidad = (Id_Unidad) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Unidad)
                Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
            }
        });
    }

    return (
        <>
            <Sidebar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Codigo de la unidad</th>
                        <th>Nombre de la unidad</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(unidadList) && unidadList.map((unidad) => (
                        <tr key={unidad.Id_Unidad}>
                            <td>{unidad.Id_Unidad}</td>
                            <td>{unidad.Nom_Unidad}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => getUnidad(unidad.Id_Unidad)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteUnidad(unidad.Id_Unidad)}>Borrar</button>
                            </td>   
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormUnidad buttonForm={buttonForm} unidad={unidad} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryUnidad URI={URI} getUnidad={getUnidad} deleteUnidad={deleteUnidad} buttonForm={buttonForm} />
        </>
    )
}

export default CrudUndiad