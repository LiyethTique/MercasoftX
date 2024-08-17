import axios from "axios"
import { useEffect, useState } from "react"

const FormQueryVenta = ({ URI, getVenta, deleteVenta, buttonForm}) => {
     const [ventaQuery, setVentaQuery] = useState([])
     const [id, setId] = useState('')

     const sendFormQuery = async (id) => {
        if (id) {
            const respuesta = await axios.get(URI + 'consulta/' + id)

            setVentaQuery(
                respuesta.data
            ) 
            }else {
                setVentaQuery([])
        } 
     }

     useEffect(() =>{
        setVentaQuery([])
        setId('')
     }, [buttonForm])

     return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="idQuery">Codigo</label>
                <br />
                <input type="number" id="idQuery" value={id} onChange={(e) => { sendFormQuery(e.target.value); setId(e.target.value)}}/>
            </form>
            {
                ventaQuery.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>codigo</th>
                            <th>Fecha Venta</th>
                            <th>Cantidad Venta</th>
                            <th>Valor Venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaQuery.map((venta) =>(
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
                                <td>{venta.Fec_Venta}</td>
                                <td>{venta.Can_Venta}</td>
                                <td>{venta.Val_Venta}</td>
                                <td>
                                    <button onClick={() => getVenta(venta.id)}>Editar</button>
                                    <button onClick={() => deleteVenta(venta.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : ''
            }    
        </>
     )
}

export default FormQueryVenta