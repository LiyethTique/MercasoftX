import axios from "axios"
import { useEffect, useState } from "react"

const formQueryPedido = ({ URI, getPedido, deletePedido, buttonForm }) => {
    const [pedidoQuery, setPedidoQuery] = useState([])
    const [Fec_Pedido, setFec_Pedido] = useState('')

    const sendQueryPedido = async (Id_Producto) => {
        if(Id_Producto.status == 201){
            const respuesta = await axios.get(URI + 'Id_Producto/' + Id_Producto)
            setPedidoQuery(respuesta.data)
        } else {
            setPedidoQuery([])
        }
    }

    useEffect(() => {
            setPedidoQuery([])
            setId_Producto('')
        }, [buttonForm])

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="productoQuery">Nombre del producto</label>
                <input type="text" id="productoQuery" value={Id_Producto} onChange={(e) => { sendQueryPedido(e.target.value); setId_Producto(e.target.value) }} />
            </form>
            {Id_Producto.length > 0 ?
                <table>            
                    <thead>
                        <tr>
                            <th>Fecha del pedido</th>
                            <th>Nombre del cliente</th>
                            <th>Estado del pedido</th>
                            <th>Nombre del producto</th>
                            <th>Valor del pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidoQuery.map((pedido) => (
                            <tr key={pedido.Id_Pedido}>
                                <td>{pedido.Fec_Pedido}</td>
                                <td>{pedido.Id_Cliente}</td>
                                <td>{pedido.Est_Pedido}</td>
                                <td>{pedido.Val_Pedido}</td>
                                <td>
                                    <button onClick={() => getPedido(pedido.Fec_Pedido)}>Editar</button>
                                    <button onClick={() => deletePedido(pedido.Fec_Pedido)}>Borrar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>:''
            }
        </>
    )
}

export default formQueryPedido