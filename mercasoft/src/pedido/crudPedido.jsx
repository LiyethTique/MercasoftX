import axios from 'axios'
import { useState, useEffect } from 'react'
import FormPedido from './formPedido'
import FormQueryPedido from './formQueryPedido'
// import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

const URI = process.env.SERVER_BACK + '/pedido/'
console.log(URI)

const crudPedido = () => {

    const [pedidoList, setPedidoList] = useState([])

    const [buttonForm, setButtonForm] = useState('Enviar')

    const [pedido, setPedido] = useState({
        Id_Pedido: '',
        Fec_Pedido: '',
        Id_Cliente: '',
        Est_Pedido: '',
        Val_Pedido: '',
    })

    useEffect(() => {
        getAllPedido()
    }, [pedidoList]);

    const getAllPedido = async () => {
        try {
            const respuesta = await axios.get(URI)
            if (respuesta.status == 200) {
                setPedidoList(respuesta.data)
            }
            console.log(respuesta)
        } catch (error) {
            alert(error.response.data.message)
        }
    }


    const getPedido = async (Id_Pedido) => {
        setButtonForm('Enviar')
        const respuesta = await axios.get(URI + Id_Pedido)
        console.log(respuesta)
        if (respuesta.status == 201) {
            setButtonForm('Actualizar')
            setPedido({
                ...respuesta.data
            })
        }
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deletePedido = (Id_Pedido) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Pedido)
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
                        <th>Fecha del pedido</th>
                        <th>Nombre del cliente</th>
                        <th>Estado del pedido</th>
                        <th>Val del pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidoList.map((pedido) => {
                        <tr key={pedido.id}>
                            <td>{pedido.Fec_Pedido}</td>
                            <td>{pedido.Id_Cliente}</td>
                            <td>{pedido.Est_Pedido}</td>
                            <td>{pedido.Val_Pedido}</td>
                            <td>
                                <button onClick={() => getPedido(pedido.Id_Pidido)}>Editar</button>
                                <button onClick={() => deletePedido(pedido.Id_Pq)}>Borrar</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <hr />
            <FormPedido buttonForm={buttonForm} pedido={pedido} URI={URI} updateTextButton={updateTextButton} />
            <FormQueryPedido URI={URI} getPedido={getPedido} deletePedido={deletePedido} buttonForm={buttonForm} />
        </>
    )
}

export default crudPedido