import axios from "axios";
import { useState, useEffect } from "react";

const categorias = {
    PORCINOS: [
        "Piensos y alimentos para cerdos",
        "Suplementos nutricionales",
        "Equipos de crianza",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    CAPRINOS: [
        "Piensos y alimentos para cabras",
        "Suplementos nutricionales",
        "Equipos de ordeño",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    CUNICULTURA: [
        "Piensos y alimentos para conejos",
        "Suplementos nutricionales",
        "Equipos de crianza",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    AVICULTURA: [
        "Piensos y alimentos para aves",
        "Suplementos nutricionales",
        "Equipos de incubación",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    GANADERIA: [
        "Piensos y alimentos para ganado",
        "Suplementos nutricionales",
        "Equipos de ordeño",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    OVINOS: [
        "Piensos y alimentos para ovejas",
        "Suplementos nutricionales",
        "Equipos de manejo y esquila",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    PISCICULTURA: [
        "Piensos y alimentos para peces",
        "Suplementos nutricionales",
        "Equipos de cultivo acuático",
        "Productos de salud animal",
        "Materiales de manejo y transporte"
    ],
    APICULTURA: [
        "Piensos y alimentos para abejas",
        "Suplementos nutricionales",
        "Equipos de cosecha de miel",
        "Productos de salud de las abejas",
        "Materiales de manejo y transporte"
    ],
    PLANTA_CONCENTRADOS: [
        "Concentrados de alimentos",
        "Suplementos nutricionales",
        "Equipos de procesamiento",
        "Ingredientes para mezclas",
        "Materiales de empaque"
    ],
    LABORATORIO_REPRODUCCION_BOVINA: [
        "Equipos de inseminación artificial",
        "Suplementos reproductivos",
        "Productos de salud reproductiva",
        "Equipos de diagnóstico",
        "Materiales de laboratorio"
    ]
};
    // ... tus categorías aquí


const FormCategoria = ({ buttonForm, categoria, URI, updateTextButton, onSuccess }) => {
    const [categoriaPrincipal, setCategoriaPrincipal] = useState('');
    const [subcategoria, setSubcategoria] = useState('');

    const handleCategoriaChange = (e) => {
        setCategoriaPrincipal(e.target.value);
        setSubcategoria('');
    };

    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                console.log('actualizando...');

                await axios.put(URI + categoria.Id_Categoria, {
                    Nom_Categoria: subcategoria
                });

                updateTextButton('Enviar');
                onSuccess(); // Notifica el éxito a CrudCategoria
                clearForm();

            } else if (buttonForm === 'Enviar') {
                console.log('guardando...');

                await axios.post(URI, {
                    Nom_Categoria: subcategoria
                });

                onSuccess(); // Notifica el éxito a CrudCategoria
                clearForm();
            }
        } catch (error) {
            alert('Error al guardar la categoría');
        }
    };

    const clearForm = () => {
        setCategoriaPrincipal('');
        setSubcategoria('');
    };

    const setData = () => {
        if (categoria.Nom_Categoria) {
            for (const [key, values] of Object.entries(categorias)) {
                if (values.includes(categoria.Nom_Categoria)) {
                    setCategoriaPrincipal(key);
                    setSubcategoria(categoria.Nom_Categoria);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        setData();
    }, [categoria]);

    return (
        <>
            <form id="categoriaForm" action="" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="categoriaPrincipal">Categoría Principal</label>
                <select
                    id="categoriaPrincipal"
                    value={categoriaPrincipal}
                    required
                    onChange={handleCategoriaChange}
                >
                    <option value="">Seleccionar...</option>
                    {Object.keys(categorias).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="subcategoria">Subcategoría</label>
                <select
                    id="subcategoria"
                    value={subcategoria}
                    required
                    onChange={(e) => setSubcategoria(e.target.value)}
                    disabled={!categoriaPrincipal}
                >
                    <option value="">Seleccionar...</option>
                    {categoriaPrincipal &&
                        categorias[categoriaPrincipal].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                </select>
                <br />

                <input
                    type="submit"
                    id="boton"
                    value={buttonForm}
                    className="btn btn-success"
                />
            </form>
        </>
    );
};

export default FormCategoria;
