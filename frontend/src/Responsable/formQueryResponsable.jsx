import axios from "axios";
import { useEffect, useState } from "react";


const FormQueryResponsable = ({ URI, getResponsable, deleteResponsable, buttonForm }) => {
    const [responsableQuery, setResponsableQuery] = useState([]);
    const [id, setId] = useState('');

    const sendFormQuery = async (id) => {
        if (id) {
            const respuesta = await axios.get(URI + 'consulta/' + id);

            setResponsableQuery(respuesta.data);
        } else {
            setResponsableQuery([]);
        }
    };

    useEffect(() => {
        setResponsableQuery([]);
        setId('');
    }, [buttonForm]);

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="idQuery">ID Responsable</label>
                <br />
                <input
                    type="number"
                    id="idQuery"
                    value={id}
                    onChange={(e) => {
                        sendFormQuery(e.target.value);
                        setId(e.target.value);
                    }}
                />
            </form>
            {responsableQuery.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID Responsable</th>
                            <th>Nombre Responsable</th>
                            <th>Correo Responsable</th>
                            <th>Teléfono Responsable</th>
                            <th>Tipo Responsable</th>
                            <th>Género Responsable</th>
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
                                    <button onClick={() => getResponsable(responsable.Id_Responsable)}>Editar</button>
                                    <button onClick={() => deleteResponsable(responsable.Id_Responsable)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                ''
            )}
        </>
    );
};

export default FormQueryResponsable;