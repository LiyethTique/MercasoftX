import axios from 'axios';
import {useState } from 'react';
import { useEffect } from 'react';


const FormProyecto = ({ buttonForm, response, URI, updateTextButton }) => {
    const [Documento, setDocumento] = useState('');
    const [Nombres, setNombres] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Tip_responsable, setResponsable] = useState('');
    const [Genero, setGenero] = useState('');

    const sendForm = (e) => {
        e.preventDefault();

        if (buttonForm === 'Actualizar') {
            console.log('actualizando ando...');
            axios.put(URI + response.id, {
                Documento: Documento,
                Nombres: Nombres,
                Apellidos: Apellidos,
                Telefono: Telefono,
                Correo: Correo,
                Tip_responsable: Tip_responsable,
                Genero: Genero
            })
            updateTextButton('Enviar');
            clearForm();
        } else if (buttonForm === 'Enviar') {
            console.log('guardando ando');
            axios.post(URI, {
                Documento: Documento,
                Nombres: Nombres,
                Apellidos: Apellidos,
                Telefono: Telefono,
                Correo: Correo,
                Tip_responsable: Tip_responsable,
                Genero: Genero
            });
            clearForm();
        }
    };

    const clearForm = () => {
        setDocumento('');
        setNombres('');
        setApellidos('');
        setTelefono('');
        setCorreo('');
        setResponsable('');
        setGenero('');
    }

    const setData = () => {
        setDocumento(response.Documento);
        setNombres(response.Nombres);
        setApellidos(response.Apellidos);
        setTelefono(response.Telefono);
        setCorreo(response.Correo);
        setResponsable(response.Tip_responsable);
        setGenero(response.Genero);
    };

    useEffect(() => {
        setData();
    }, [response]);

    return (
        <>
            <form id="responsaForm" action="" onSubmit={sendForm}>
                <label htmlFor="documento">Documento</label>
                <input type="text" id="documento" value={Documento} onChange={(e) => setDocumento(e.target.value)} />
                <br />
                <label htmlFor="nombres">Nombres</label>
                <input type="text" id="nombres" value={Nombres} onChange={(e) => setNombres(e.target.value)} />
                <br />
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" id="apellidos" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
                <br />
                <label htmlFor="telefono">Telefono</label>
                <input type="number" id="telefono" value={Telefono} onChange={(e) => setTelefono(e.target.value)} />
                <br />
                <label htmlFor="correo">Correo</label>
                <input type="text" id="correo" value={Correo} onChange={(e) => setCorreo(e.target.value)} />
                <br />
                <label htmlFor="tipo_responsable">Tipo Responsable</label>
                <select id="tipo_responsable" value={Tip_responsable} onChange={(e) => setResponsable(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option >Instructor</option>
                    <option >Aprendiz</option>
                    
                </select>
                

                <br />
                <label htmlFor="genero">Género</label>
                <select name="" id="genero" value={Genero} onChange={(e) => setGenero(e.target.value)} >
                    <option value="">Selecciona uno...</option>
                    <option value="F">Femenino</option> 
                    <option value="M">Masculino</option>
                    <option value="O">Otro</option>
                    
                </select>
                <br />

                <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
            </form>
        </>
    );
};

export default FormProyecto;
