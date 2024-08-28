import axios from "axios";
import { useState, useEffect } from "react";

const FormQueryResponsable = ({ URI, getResponsable, deleteResponsable, buttonForm }) => {
    const [responsableQuery, setResponsableQuery] = useState([]);
    const [id, setId] = useState('');

    const sendFormQuery = async (id) => {
        if (!id) {
            setResponsableQuery([]);
            return;
        }

        console.log("ID enviado para la consulta:", id);

        try {
            const respuesta = await axios.get(`${URI}consulta/${id}`);
            console.log("Respuesta de la API:", respuesta.data);
            setResponsableQuery([respuesta.data]);
        } catch (error) {
            console.error('Error al realizar la consulta:', error.response ? error.response.data : error.message);
            alert('Error al realizar la consulta. Verifica el ID e intenta nuevamente.');
            setResponsableQuery([]);
        }
    };

    useEffect(() => {
        setResponsableQuery([]);
        setId('');
    }, [buttonForm]);

    const handleInputChange = (e) => {
        const newId = e.target.value;
        setId(newId);
        sendFormQuery(newId);
    };

    return (
        <>
        <center>
            <form id="queryForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="idQuery">ID Responsable</label>
                <br />
                <input
                    type="number"
                    id="idQuery"
                    value={id}
                    onChange={handleInputChange}
                    placeholder="Ingrese ID del Responsable"
                    min="1"
                />
            </form>
            </center>
            {responsableQuery.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Responsable</th>
                            <th>Nombre Responsable</th>
                            <th>Correo Responsable</th>
                            <th>Teléfono Responsable</th>
                            <th>Tipo Responsable</th>
                            <th>Género Responsable</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsableQuery.map((responsable) => (
                            <tr key={responsable.Id_Responsable}>
                                <td>{responsable.Id_Responsable}</td>
                                <td>{responsable.Nom_Responsable}</td>
                                <td>{responsable.Cor_Responsable}</td>
                                <td>{responsable.Tel_Responsable}</td>
                                <td>{responsable.Tip_Responsable}</td>
                                <td>{responsable.Tip_Genero}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => getResponsable(responsable.Id_Responsable)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => deleteResponsable(responsable.Id_Responsable)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default FormQueryResponsable;
