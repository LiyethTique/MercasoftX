// FormProducto.jsx
import axios from "axios";
import { useState, useEffect } from "react";

const FormProducto = ({ buttonForm, producto, URI, updateTextButton, onSuccess }) => {
    const [nomProducto, setNomProducto] = useState('');
    const [carProducto, setCarProducto] = useState('');
    const [prePromedio, setPrePromedio] = useState('');
    const [exiProducto, setExiProducto] = useState('');
    const [imaProducto, setImaProducto] = useState('');
    const [fecVencimiento, setFecVencimiento] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [preAnterior, setPreAnterior] = useState('');
    const [uniDeMedida, setUniDeMedida] = useState('');
    const [preProducto, setPreProducto] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                console.log('actualizando...');

                await axios.put(URI + producto.Id_Producto, {
                    Nom_Producto: nomProducto,
                    Car_Producto: carProducto,
                    Pre_Promedio: prePromedio,
                    Exi_Producto: exiProducto,
                    Ima_Producto: imaProducto,
                    Fec_Vencimiento: fecVencimiento,
                    Id_Categoria: idCategoria,
                    Pre_Anterior: preAnterior,
                    Uni_DeMedida: uniDeMedida,
                    Pre_Producto: preProducto
                });

                updateTextButton('Enviar');
                onSuccess(); // Notifica el éxito a CrudProducto
                clearForm();

            } else if (buttonForm === 'Enviar') {
                console.log('guardando...');

                await axios.post(URI, {
                    Nom_Producto: nomProducto,
                    Car_Producto: carProducto,
                    Pre_Promedio: prePromedio,
                    Exi_Producto: exiProducto,
                    Ima_Producto: imaProducto,
                    Fec_Vencimiento: fecVencimiento,
                    Id_Categoria: idCategoria,
                    Pre_Anterior: preAnterior,
                    Uni_DeMedida: uniDeMedida,
                    Pre_Producto: preProducto
                });

                onSuccess(); // Notifica el éxito a CrudProducto
                clearForm();
            }
        } catch (error) {
            alert('Error al guardar el producto');
        }
    };

    const clearForm = () => {
        setNomProducto('');
        setCarProducto('');
        setPrePromedio('');
        setExiProducto('');
        setImaProducto('');
        setFecVencimiento('');
        setIdCategoria('');
        setPreAnterior('');
        setUniDeMedida('');
        setPreProducto('');
    };

    const setData = () => {
        if (producto.Nom_Producto) {
            setNomProducto(producto.Nom_Producto);
            setCarProducto(producto.Car_Producto);
            setPrePromedio(producto.Pre_Promedio);
            setExiProducto(producto.Exi_Producto);
            setImaProducto(producto.Ima_Producto);
            setFecVencimiento(producto.Fec_Vencimiento);
            setIdCategoria(producto.Id_Categoria);
            setPreAnterior(producto.Pre_Anterior);
            setUniDeMedida(producto.Uni_DeMedida);
            setPreProducto(producto.Pre_Producto);
        }
    };

    useEffect(() => {
        setData();
    }, [producto]);

    return (
        <>
            <form id="productoForm" action="" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="nomProducto">Nombre del Producto</label>
                <input
                    type="text"
                    id="nomProducto"
                    value={nomProducto}
                    required
                    onChange={(e) => setNomProducto(e.target.value)}
                />
                <br />

                <label htmlFor="carProducto">Descripción del Producto</label>
                <input
                    type="text"
                    id="carProducto"
                    value={carProducto}
                    required
                    onChange={(e) => setCarProducto(e.target.value)}
                />
                <br />

                <label htmlFor="prePromedio">Precio Promedio</label>
                <input
                    type="number"
                    id="prePromedio"
                    value={prePromedio}
                    required
                    onChange={(e) => setPrePromedio(e.target.value)}
                />
                <br />

                <label htmlFor="exiProducto">Existencia</label>
                <input
                    type="number"
                    id="exiProducto"
                    value={exiProducto}
                    required
                    onChange={(e) => setExiProducto(e.target.value)}
                />
                <br />

                <label htmlFor="imaProducto">Imagen</label>
                <input
                    type="text"
                    id="imaProducto"
                    value={imaProducto}
                    required
                    onChange={(e) => setImaProducto(e.target.value)}
                />
                <br />

                <label htmlFor="fecVencimiento">Fecha de Vencimiento</label>
                <input
                    type="date"
                    id="fecVencimiento"
                    value={fecVencimiento}
                    required
                    onChange={(e) => setFecVencimiento(e.target.value)}
                />
                <br />

                <label htmlFor="idCategoria">Categoría</label>
                <input
                    type="number"
                    id="idCategoria"
                    value={idCategoria}
                    required
                    onChange={(e) => setIdCategoria(e.target.value)}
                />
                <br />

                <label htmlFor="preAnterior">Precio Anterior</label>
                <input
                    type="number"
                    id="preAnterior"
                    value={preAnterior}
                    required
                    onChange={(e) => setPreAnterior(e.target.value)}
                />
                <br />

                <label htmlFor="uniDeMedida">Unidad de Medida</label>
                <input
                    type="text"
                    id="uniDeMedida"
                    value={uniDeMedida}
                    required
                    onChange={(e) => setUniDeMedida(e.target.value)}
                />
                <br />

                <label htmlFor="preProducto">Precio Producto</label>
                <input
                    type="number"
                    id="preProducto"
                    value={preProducto}
                    required
                    onChange={(e) => setPreProducto(e.target.value)}
                />
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

export default FormProducto;
