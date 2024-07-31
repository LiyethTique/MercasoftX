import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormProductos from './formProductos'


import Swal from 'sweetalert2'
import FormQueryProducto from './formQueryProducto'

const URI = 'http://localhost:8000/products/'
const PATH_IMA_PRODUCTOS = 'http://localhost:8000/public/uploads/'

const CrudProductos = () => {


    const [productoList, setProductoList] = useState ([])

    const [buttonForm, setButtonForm] = useState('Enviar')
    //nuevo
    const [producto, setProducto] = useState({
        id: '',
        Nom_Producto: '',
        Car_Producto: '',
        Pre_Promedio: '',
        Exi_Producto: '',
        Ima_Producto: null,
        Fec_Vencimiento: '',
        Pre_Anterior: '',
        Uni_DeMedida: '',
        Pre_Producto: '',
       

    })


	useEffect(()=> {
		getAllProductos() //ejecuta la funcion getAllProductos 

	}, [productoList])

	const getAllProductos = async () => {
		const respuesta = await axios.get(URI)	
		setProductoList(respuesta.data)
	}


    const getProducto= async(idProducto) => {
        
        setButtonForm('Enviar')
        const respuesta = await axios.get(URI + idProducto)

        setButtonForm('Actualizar')

        setProducto({
            ...respuesta.data 
        })
      
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }
    
    const deleteProducto =(idProducto) =>{
        Swal.fire({
            title: "Estás Seguro?",
            text: "No Podrás Revertir Esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + idProducto)
              Swal.fire({
                title: "Borrado!",
                text: "El Registro Ha Sido Borrado.",
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
                   <th>Nom_Producto</th>
	               <th>Car_Producto</th>
                   <th>Pre_Promedio</th>  
                   <th>Exi_Producto</th> 
                   <th>Ima_Producto</th> 
                   <th>Fec_Vencimiento</th> 
                   <th>Pre_Anterior</th>
                   <th>Uni_DeMedida</th>
                   <th>Pre_Producto</th>

                </tr>
            </thead>
            <tbody> 
                {productoList.map((producto) => (
                    <tr key={producto.id}>
                        <td>{producto.Nom_Producto}</td>
                        <td>{producto.Car_Producto}</td>|
                        <td>{producto.Pre_Promedio}</td>
                        <td>{producto.Exi_Producto}</td>
                        <td><img width="80px" src={PATH_IMA_PRODUCTOS + producto.Ima_Producto}></img></td>
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
        </table>
        <hr />
        
        <FormProductos buttonForm={buttonForm} producto={producto} URI={URI} updateTextButton={updateTextButton}/>
        <hr/>
        
        <FormQueryProducto URI={URI} getProducto={getProducto} deleteProducto={deleteProducto} buttonForm={buttonForm} />
		</>
	)

}
export default CrudProductos