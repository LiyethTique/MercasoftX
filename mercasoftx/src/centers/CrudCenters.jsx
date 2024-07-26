import axios from "axios"
import { useState, useEffect } from "react"

const URI_CENTERS = 'http://localhost:8000/centers/'

const crudCenters = () => {

    const [centers, setCenters] = useState ([])

    const getAllCenters = async () => {

        const response = await axios.get(URI_CENTERS)

        setCenters(response.data)
    }

    useEffect(() => {
        getAllCenters()
    }, [])


    return (
        <>
           <h1>centros de formacion</h1>
           <table>
            <thead>
                <tr>
                <th>Codigo de centro</th>
                <th>Departamento</th>
                <th>Municipio</th>
                <th>Nombre del centro</th>
                </tr> 
            </thead>
            <tbody>
                {centers.map((center) => (

                    <tr key={center.id}>
                        <td>{center.codigo_centro}</td>
                        <td>{center.idDepto}</td>
                        <td>{center.id_municipio}</td>
                        <td>{center.nombre_centro}</td>
                    </tr>
                ))}
            </tbody>
           </table>
        
        </>

    )
        
}

export default crudCenters