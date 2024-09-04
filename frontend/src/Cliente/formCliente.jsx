import axios from "axios";
import { useState, useEffect } from "react";


const FormCliente = ({ buttonForm, cliente, URI, updateTextButton, onSuccess }) => {
    const [nomCliente, setNomCliente] = useState('');
    const [corCliente, setCorCliente] = useState('');
    const [telCliente, setTelCliente] = useState('');
    const [idCarrito, setIdCarrito] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Nom_Cliente') setNomCliente(value);
        if (name === 'Cor_Cliente') setCorCliente(value);
        if (name === 'Tel_Cliente') setTelCliente(value);
        if (name === 'Id_Carrito') setIdCarrito(value);
    };

    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                await axios.put(URI + cliente.Id_Cliente, {
                    Nom_Cliente: nomCliente,
                    Cor_Cliente: corCliente,
                    Tel_Cliente: telCliente,
                    Id_Carrito: idCarrito
                });

                updateTextButton('Enviar');
                onSuccess(); // Notifica el éxito a CrudCliente
                clearForm();

            } else if (buttonForm === 'Enviar') {
                await axios.post(URI, {
                    Nom_Cliente: nomCliente,
                    Cor_Cliente: corCliente,
                    Tel_Cliente: telCliente,
                    Id_Carrito: idCarrito
                });

                onSuccess(); // Notifica el éxito a CrudCliente
                clearForm();
            }
        } catch (error) {
            alert('Error al guardar el cliente');
        }
    };

    const clearForm = () => {
        setNomCliente('');
        setCorCliente('');
        setTelCliente('');
        setIdCarrito('');
    };

    const setData = () => {
        if (cliente.Nom_Cliente) {
            setNomCliente(cliente.Nom_Cliente);
            setCorCliente(cliente.Cor_Cliente);
            setTelCliente(cliente.Tel_Cliente);
            setIdCarrito(cliente.Id_Carrito);
        }
    };

    useEffect(() => {
        setData();
    }, [cliente]);

    return (
        <>
            <form id="clienteForm" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="nomCliente">Nombre Cliente</label>
                <input
                    type="text"
                    id="nomCliente"
                    name="Nom_Cliente"
                    value={nomCliente}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="corCliente">Correo Cliente</label>
                <input
                    type="email"
                    id="corCliente"
                    name="Cor_Cliente"
                    value={corCliente}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="telCliente">Teléfono Cliente</label>
                <input
                    type="text"
                    id="telCliente"
                    name="Tel_Cliente"
                    value={telCliente}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="idCarrito">ID Carrito</label>
                <input
                    type="number"
                    id="idCarrito"
                    name="Id_Carrito"
                    value={idCarrito}
                    onChange={handleChange}
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

export default FormCliente;
