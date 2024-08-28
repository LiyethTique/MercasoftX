import axios from 'axios'
import { useState, useEffect } from 'react'
import FormVenta from './formVenta'
import FormQueryVenta from './formQueryVenta'
import Sidebar from '../Sidebar/Sidebar'

import Swal from 'sweetalert2'

const URI = process.env.SERVER_BACK + '/venta/'

const CrudVenta = () => {

    const [ventaList, setVentaList] = useState([])

    const [buttonForm, setButtonForm] = useState('Enviar')
    
    const [venta, setVenta] = useState({
        Id_Venta: '',
        Fec_Venta: '',
        Val_Venta: '',
        Id_Pedido: ''
    })

    useEffect(() => {
        getAllVenta()
    }, [])

    const getAllVenta = async () => {
        try {
            const respuesta = await axios.get(URI)
            setVentaList(Array.isArray(respuesta.data) ? respuesta.data : [])
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener las Ventas")
        }
    }

    const getVenta = async (Id_Venta) => {
        setButtonForm('Actualizar')
        console.log('Id_Venta' + Id_Venta)
        const respuesta = await axios.get(URI + Id_Venta)
        console.log(respuesta)
        setVenta({
            ...respuesta.data
        })
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteVenta = (Id_Venta) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Venta)
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllVenta(); // Refrescar la lista después de eliminar
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
                        <th>Fecha Venta</th>
                        <th>Valor Venta</th>
                        <th>Codigo Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(ventaList) && ventaList.map((venta) => (
                        <tr key={venta.Id_Venta}>
                            <td>{venta.Id_Venta}</td>
                            <td>{venta.Fec_Venta}</td>
                            <td>{venta.Val_Venta}</td>
                            <td>{venta.Id_Pedido}</td>

                            <td>
                                <button className="btn btn-warning" onClick={() => getVenta(venta.Id_Venta)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteVenta(venta.Id_Venta)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormVenta buttonForm={buttonForm} venta={venta} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryVenta URI={URI} getVenta={getVenta} deleteVenta={deleteVenta} buttonForm={buttonForm} />
        </>
    )
}

export default CrudVenta