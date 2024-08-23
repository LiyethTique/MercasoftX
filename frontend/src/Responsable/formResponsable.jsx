import axios from "axios";
import { useState, useEffect } from "react";


const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton }) => {
    const [Nom_Responsable, setNombre] = useState('');
    const [Cor_Responsable, setCorreo] = useState('');
    const [Tel_Responsable, setTelefono] = useState('');
    const [Tip_Responsable, setTipo] = useState('');
    const [Tip_Genero, setGenero] = useState('');

    const sendForm = (e) => {
        e.preventDefault();

        if (buttonForm === 'Actualizar') {
            console.log('actualizando ando...');

            axios.put(URI + responsable.Id_Responsable, {
                Nom_Responsable: Nom_Responsable,
                Cor_Responsable: Cor_Responsable,
                Tel_Responsable: Tel_Responsable,
                Tip_Responsable: Tip_Responsable,
                Tip_Genero: Tip_Genero
            });

            updateTextButton('Enviar');
            clearForm();

        } else if (buttonForm === 'Enviar') {
            console.log('guardando ando...');
            axios.post(URI, {
                Nom_Responsable: Nom_Responsable,
                Cor_Responsable: Cor_Responsable,
                Tel_Responsable: Tel_Responsable,
                Tip_Responsable: Tip_Responsable,
                Tip_Genero: Tip_Genero
            });

            clearForm();
        }
    };

    const clearForm = () => {
        setNombre('');
        setCorreo('');
        setTelefono('');
        setTipo('');
        setGenero('');
    };

    const setData = () => {
        setNombre(responsable.Nom_Responsable || '');
        setCorreo(responsable.Cor_Responsable || '');
        setTelefono(responsable.Tel_Responsable || '');
        setTipo(responsable.Tip_Responsable || '');
        setGenero(responsable.Tip_Genero || '');
    };

    useEffect(() => {
        setData();
    }, [responsable]);

    return (
        <>
            <form id="responsableForm" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="nombreResponsable">Nombre Responsable</label>
                <input
                    type="text"
                    id="nombreResponsable"
                    value={Nom_Responsable}
                    onChange={(e) => setNombre(e.target.value)}
                    maxLength="100"
                />
                <br />

                <label htmlFor="correoResponsable">Correo Responsable</label>
                <input
                    type="email"
                    id="correoResponsable"
                    value={Cor_Responsable}
                    onChange={(e) => setCorreo(e.target.value)}
                    maxLength="100"
                />
                <br />

                <label htmlFor="telefonoResponsable">Teléfono Responsable</label>
                <input
                    type="tel"
                    id="telefonoResponsable"
                    value={Tel_Responsable}
                    onChange={(e) => setTelefono(e.target.value)}
                    maxLength="15"
                />
                <br />

                <label htmlFor="tipoResponsable">Tipo Responsable</label>
                <input
                    type="text"
                    id="tipoResponsable"
                    value={Tip_Responsable}
                    onChange={(e) => setTipo(e.target.value)}
                    maxLength="50"
                />
                <br />

                <label htmlFor="generoResponsable">Género Responsable</label>
                <input
                    type="text"
                    id="generoResponsable"
                    value={Tip_Genero}
                    onChange={(e) => setGenero(e.target.value)}
                    maxLength="10"
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

export default FormResponsable;