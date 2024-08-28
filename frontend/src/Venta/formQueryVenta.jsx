import axios from "axios"
import { useEffect, useState } from "react"

const FormQueryVenta = ({ URI, getVenta, deleteVenta, buttonForm}) => {
     const [ventaQuery, setVentaQuery] = useState([])
     const [Id_Venta, setId_Venta] = useState('')

     const sendFormQuery = async (Id_Venta) => {
        if (Id_Venta) {
            const respuesta = await axios.get(URI + 'consulta/' + Id_Venta)
            setVentaQuery(respuesta.data) 
            }else {
                setVentaQuery([])
        } 
     }

     useEffect(() =>{
        setVentaQuery([])
        setId_Venta('')
     }, [buttonForm])

     return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="idQuery">Codigo</label>
                <br />
                <input type="number" id="idQuery" value={Id_Venta} onChange={(e) => { sendFormQuery(e.target.value); setId_Venta(e.target.value)}}/>
            </form>
            {
                ventaQuery.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>codigo</th>
                            <th>Fecha Venta</th>
                            <th>Valor Venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaQuery.map((venta) =>(
                            <tr key={venta.Id_Venta}>
                                <td>{venta.Id_Venta}</td>
                                <td>{venta.Fec_Venta}</td>
                                <td>{venta.Val_Venta}</td>
                                <td>
                                    <button onClick={() => getVenta(venta.Id_Venta)}>Editar</button>
                                    <button onClick={() => deleteVenta(venta.Id_Venta)}>Borrar</button>
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