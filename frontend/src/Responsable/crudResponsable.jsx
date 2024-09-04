import axios from 'axios';
import { useState, useEffect } from 'react';
import FormResponsable from '../Responsable/formResponsable';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';


const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Cor_Responsable: '',
        Tel_Responsable: '',
        Tip_Responsable: '',
        Tip_Genero: ''
    });

    useEffect(() => {
        getAllResponsable();
    }, []);

    const getAllResponsable = async () => {
        try {
            const respuesta = await axios.get(URI);
            setResponsableList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener los Responsables");
        }
    };

    const getResponsable = async (Id_Responsable) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Responsable);
        setResponsable({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = (Id_Responsable) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Responsable);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllResponsable(); // Refrescar la lista después de eliminar
            }
        });
    };

    // Preparar los títulos de las columnas y los datos
    const titles = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Tipo Responsable', 'Género', 'Acciones'];
    const data = responsableList.map(responsable => [
        responsable.Id_Responsable,
        responsable.Nom_Responsable,
        responsable.Cor_Responsable,
        responsable.Tel_Responsable,
        responsable.Tip_Responsable,
        responsable.Tip_Genero,
        <div>
            <button className="btn btn-warning" onClick={() => getResponsable(responsable.Id_Responsable)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteResponsable(responsable.Id_Responsable)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Responsables</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormResponsable buttonForm={buttonForm} responsable={responsable} URI={URI} updateTextButton={updateTextButton} />
        </>
    );
};

export default CrudResponsable;
