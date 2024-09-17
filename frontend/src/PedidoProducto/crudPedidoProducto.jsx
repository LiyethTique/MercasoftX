import axios from 'axios'
import { useState, useEffect } from 'react'
import FormPedidoProducto from './formPedidoProducto'
import FormQueryPedidoProducto from './formQueryPedidoProducto'
import Sidebar from '../Sidebar/Sidebar'

import Swal from 'sweetalert2'

const URI = process.env.SERVER_BACK + '/pedidoproducto/' // Ajusta la URI

const CrudPedidoProducto = () => {

    const [entityList, setEntityList] = useState([])
    const [buttonForm, setButtonForm] = useState('Enviar')
    const [entity, setEntity] = useState({
        Id_Entity: '',
        // Aquí colocas los demás campos de la entidad
    })

    useEffect(() => {
        getAllEntity()
    }, [])

    const getAllEntity = async () => {
        try {
            const respuesta = await axios.get(URI)
            setEntityList(respuesta.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const getEntity = async (idEntity) => {
        setButtonForm('Actualizar')
        const respuesta = await axios.get(URI + idEntity)
        setEntity({
            ...respuesta.data
        })
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteEntity = (idEntity) => {
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
                await axios.delete(URI + idEntity)
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
                        <th>Código</th>
                        {/* Aquí colocas los demás encabezados */}
                    </tr>
                </thead>
                <tbody>
                    {entityList.map((entity) => (
                        <tr key={entity.Id_Entity}>
                            <td>{entity.Id_Entity}</td>
                            {/* Aquí colocas los demás datos */}
                            <td>
                                <button className="btn btn-warning" onClick={() => getEntity(entity.Id_Entity)}>Editar</button>
                                <button className="btn btn-warning" onClick={() => deleteEntity(entity.Id_Entity)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormPedidoProducto buttonForm={buttonForm} entity={entity} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryPedidoProducto URI={URI} getEntity={getEntity} deleteEntity={deleteEntity} buttonForm={buttonForm} />
        </>
    )
}

export default CrudPedidoProducto