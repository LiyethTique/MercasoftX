import axios from "axios"
import { useEffect, useState } from "react"

const formQueryEntrada = ({ URI, getEntrada, deleteEntrada, buttonForm }) => {
    const [entradaQuery, setEntradaQuery] = useState([])
    const [Id_Producto, setId_Producto] = useState('')

    const sendQueryEntrada = async (Id_Producto) => {
        if(Id_Producto.status == 201){
            const respuesta = await axios.get(URI + 'Id_Producto/' + Id_Producto)
            setEntradaQuery(respuesta.data)
        } else {
            setEntradaQuery([])
        }
    }

    useEffect(() => {
            setEntradaQuery([])
            setId_Producto('')
        }, [buttonForm])

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="productoQuery">Nombre del producto</label>
                <input type="text" id="productoQuery" value={Id_Producto} onChange={(e) => { sendQueryEntrada(e.target.value); setId_Producto(e.target.value) }} />
            </form>
            {Id_Producto.length > 0 ?
                <table>            
                    <thead>
                        <tr>
                            <th>Fecha de la entrada</th>
                            <th>Hora de la entrada</th>
                            <th>Nombre de la unidad</th>
                            <th>Nombre del producto</th>
                            <th>Nombre de la persona encargada de hacer la entrega</th>
                            <th>Cantidad de productos</th>
                            <th>Fecha de vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entradaQuery.map((entrada) => (
                            <tr key={entrada.Id_Entrada}>
                                <td>{entrada.Fec_Entrada}</td>
                                <td>{entrada.Hor_Entrada}</td>
                                <td>{entrada.Id_Unidad}</td>
                                <td>{entrada.Id_Producto}</td>
                                <td>{entrada.Id_Responsable}</td>
                                <td>{entrada.Can_Entrada}</td>
                                <td>{entrada.Fec_Vencimiento}</td>
                                <td>
                                    <button onClick={() => getEntrada(entrada.Id_Entrada)}>Editar</button>
                                    <button onClick={() => deleteEntrada(entrada.Id_Entrada)}>Borrar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>:''
            }
        </>
    )
}

export default formQueryEntrada