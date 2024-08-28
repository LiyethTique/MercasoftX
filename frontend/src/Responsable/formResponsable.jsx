import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton }) => {
    // Definición de los estados
    const [Nom_Responsable, setNombre] = useState('');
    const [Cor_Responsable, setCorreo] = useState('');
    const [Tel_Responsable, setTelefono] = useState('');
    const [Tip_Responsable, setTipo] = useState('');
    const [Tip_Genero, setGenero] = useState('');

    // Función para enviar el formulario
    const sendForm = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                console.log('Actualizando responsable...');

                await axios.put(`${URI}/${responsable.Id_Responsable}`, {
                    Nom_Responsable,
                    Cor_Responsable,
                    Tel_Responsable,
                    Tip_Responsable,
                    Tip_Genero
                });

                Swal.fire('Éxito', 'Responsable actualizado correctamente', 'success');
                updateTextButton('Enviar');
                clearForm();

            } else if (buttonForm === 'Enviar') {
                console.log('Guardando responsable...');

                await axios.post(URI, {
                    Nom_Responsable,
                    Cor_Responsable,
                    Tel_Responsable,
                    Tip_Responsable,
                    Tip_Genero
                });

                Swal.fire('Éxito', 'Responsable agregado correctamente', 'success');
                clearForm();
             
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'No se pudo completar la operación', 'error');
        }
    };

    // Función para limpiar el formulario
    const clearForm = () => {
        setNombre('');
        setCorreo('');
        setTelefono('');
        setTipo('');
        setGenero('');
    };

    // Función para establecer los datos del responsable en el formulario
    const setData = () => {
        if (responsable) {  // Verifica si 'responsable' no es null o undefined
            setNombre(responsable.Nom_Responsable || '');
            setCorreo(responsable.Cor_Responsable || '');
            setTelefono(responsable.Tel_Responsable || '');
            setTipo(responsable.Tip_Responsable || '');
            setGenero(responsable.Tip_Genero || '');
        }
    };

    // Efecto para establecer los datos cuando cambia el 'responsable'
    useEffect(() => {
        setData();
    }, [responsable]);

    return (
        <>
        <center>
            <form id="responsableForm" onSubmit={sendForm} className="table table-striped">
                <label htmlFor="nombreResponsable">Nombre Completo</label>
                <input
                    type="text"
                    id="nombreResponsable"
                    value={Nom_Responsable}
                    onChange={(e) => setNombre(e.target.value)}
                    maxLength="100"
                    required
                />
                <br />

                <label htmlFor="correoResponsable">Correo Electronico</label>
                <input
                    type="email"
                    id="correoResponsable"
                    value={Cor_Responsable}
                    onChange={(e) => setCorreo(e.target.value)}
                    maxLength="100"
                    required
                />
                <br />

                <label htmlFor="telefonoResponsable">Teléfono</label>
                <input
                    type="tel"
                    id="telefonoResponsable"
                    value={Tel_Responsable}
                    onChange={(e) => setTelefono(e.target.value)}
                    maxLength="15"
                    required
                />
                <br />

                <label htmlFor="tipoResponsable">Tipo Responsable</label>
                <select id="tipoResponsable" value={Tip_Responsable} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Aprendiz">Aprendiz</option>
                </select>
                <br />

                <label htmlFor="genero">Género</label>
                <select id="genero" value={Tip_Genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="O">Otro</option>
                </select>
                <br />
                <br/>

                <input
                    type="submit"
                    id="boton"
                    value={buttonForm}
                    className="btn btn-success"
                />
            </form>
            </center>
        </>
    );
};

export default FormResponsable;
