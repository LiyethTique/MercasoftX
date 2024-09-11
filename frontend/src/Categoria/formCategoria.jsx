import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormCategoria = ({ buttonForm, formData = { Nom_Categoria: "" }, handleSuccess }) => {
    // Cambia la URI del backend según sea necesario
    const URI = "http://localhost:3002/categoria/"; // Asegúrate de que este puerto y ruta sean correctos

    const [categoria, setCategoria] = useState(formData);

    useEffect(() => {
        setCategoria(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (buttonForm === 'Actualizar') {
                // Verifica que 'Id_Categoria' esté definido para la actualización
                if (!categoria.Id_Categoria) {
                    throw new Error("ID de categoría no proporcionado.");
                }
                await axios.put(`${URI}${categoria.Id_Categoria}`, categoria);
                Swal.fire({
                    title: "¡Actualizado!",
                    text: "La categoría ha sido actualizada exitosamente.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            } else {
                await axios.post(URI, categoria);
                Swal.fire({
                    title: "¡Creado!",
                    text: "La categoría ha sido creada exitosamente.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            }

            handleSuccess(); // Refrescar datos en el componente padre
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Error al guardar la categoría",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="Nom_Categoria" className="form-label">Nombre de la Categoría</label>
                <input
                    type="text"
                    className="form-control"
                    id="Nom_Categoria"
                    name="Nom_Categoria"
                    value={categoria.Nom_Categoria || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">{buttonForm}</button>
        </form>
    );
};

export default FormCategoria;