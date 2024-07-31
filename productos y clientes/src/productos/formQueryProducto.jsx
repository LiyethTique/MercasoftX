import axios from "axios";
import { useEffect, useState } from "react";

const FormQueryProducto = ({ URI, getProducto, deleteProducto, buttonForm }) => {

    const[productoQuery, setProductoQuery] = useState([])
    const[Nom_Producto, setNom_Producto] = useState('')

    const sendFormQuery = async (Nom_Producto) => {

        console.log(Nom_Producto)

        if (Nom_Producto) {
            const respuesta = await axios.get(URI + 'Nom_Producto/' + Nom_Producto)
            setProductoQuery(respuesta.data)

        }else {
            setProductoQuery([])
        }
    }

    useEffect(() => {
        setProductoQuery([])
        setNom_Producto('')
    }, [buttonForm])

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="Nom_ProductoQuery">Numero</label>
                <input type="text" id="Nom_ProductoQuery" value={Nom_Producto} onChange={(e) => { sendFormQuery(e.target.value);
					 setNom_Producto(e.target.value) }} />
            </form>
                 
             { productoQuery.length > 0 ?<table>
                    <thead>
                        <tr>
                        <th>Nom_Producto</th>
                        <th>Car_Producto</th>
                        <th>Pre_Promedio</th>
                        <th>Exi_Producto</th>
                        <th>Ima_Producto</th>
                        <th>Fec_Vencimiento</th>
                        <th>Pre_Anterior</th>
                        <th>Uni_DeMedida</th>
                        <th>Pre_Producto</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { }
                        {productoQuery.map((producto) => (
                             <tr key={producto.id}>
                                
                                 <td>{producto.Nom_Producto}</td>
                                 <td>{producto.Car_Producto}</td>
                                 <td>{producto.Pre_Promedio}</td>
                                 <td>{producto.Exi_Producto}</td>
                                 <td>{producto.Ima_Producto}</td>
                                 <td>{producto.Fec_Vencimiento}</td>
                                 <td>{producto.Pre_Anterior}</td>
                                 <td>{producto.Uni_DeMedida}</td>
                                 <td>{producto.Pre_Producto}</td>
                                 <td>
                                    <button onClick={() => getProducto(producto.id)}>Editar</button>
                                    <button onClick={() => deleteProducto(producto.id)}>Borrar</button></td>
                             </tr>
                        ))}
                    </tbody>
                </table> : ''
             }
        </>
    )
}

export default FormQueryProducto