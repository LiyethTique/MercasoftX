import axios from 'axios'
import { useState, useEffect } from 'react'

const URI = process.env.SERVER_BACK + '/traslados'

const Traslados = () => {
    const [trasladoList, setTrasladoList] = useState([]);

    useEffect(() => {
        const fetchTraslados = async () => {

            await axios.get(URI).then((resp) => {
                if (resp.status == 200) {
                    setTrasladoList(resp.data);
                    console.log(resp.data)
                }
            }).catch((err) => {
                alert(err.response.data.message)
            })


        };

        fetchTraslados();
    }, []);
    return (
        <>
            <div>
                <h2>Lista de Traslados</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Traslado</th>
                            <th>Fecha Traslado</th>
                            <th>Descripción Traslado</th>
                            <th>ID Producto</th>
                            <th>Cantidad Producto</th>
                            <th>Valor Unitario</th>
                            <th>Valor Traslado</th>
                            <th>ID Responsable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trasladoList.map(traslado => (
                            <tr key={traslado.Id_Traslado}>
                                <td>{traslado.Id_Traslado}</td>
                                <td>{new Date(traslado.Traslado).toLocaleDateString()}</td>
                                <td>{traslado.Des_Traslado}</td>
                                <td>{traslado.Id_Producto}</td>
                                <td>{traslado.Can_Producto}</td>
                                <td>{traslado.Val_Unitario}</td>
                                <td>{traslado.Val_Traslado}</td>
                                <td>{traslado.Id_Responsable}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Traslados