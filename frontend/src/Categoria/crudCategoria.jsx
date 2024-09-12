import axios from 'axios';
import { useState, useEffect } from 'react';
import FormCategoria from '../Categoria/formCategoria.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';


const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/categoria/';

const CrudCategoria = () => {
    const [categoriaList, setCategoriaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [categoria, setCategoria] = useState({
        Id_Categoria: '',
        Nom_Categoria: ''
    });

    useEffect(() => {
        getAllCategoria();
    }, []);

    const getAllCategoria = async () => {
        try {
            const respuesta = await axios.get(URI);
            setCategoriaList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener las Categorías");
        }
    };

    const getCategoria = async (Id_Categoria) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Categoria);
        setCategoria({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCategoria = (Id_Categoria) => {
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
                await axios.delete(URI + Id_Categoria);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllCategoria(); // Refrescar la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        getAllCategoria(); // Actualizar la lista de categorías
    };

    const titles = ['Código', 'Nombre Categoría', 'Acciones'];
    const data = categoriaList.map(categoria => [
        categoria.Id_Categoria,
        categoria.Nom_Categoria,
        <div>
            <button className="btn btn-warning" onClick={() => getCategoria(categoria.Id_Categoria)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteCategoria(categoria.Id_Categoria)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Categorías</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormCategoria buttonForm={buttonForm} categoria={categoria} URI={URI} updateTextButton={updateTextButton} onSuccess={handleSuccess} />
        </>
    );
};

export default CrudCategoria;
