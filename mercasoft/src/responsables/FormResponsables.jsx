import React, { useState, useEffect } from 'react';

const FormResponsable = ({ buttonForm, response, onFormSubmit }) => {
    const [Documento, setDocumento] = useState('');
    const [Nombres, setNombres] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Tip_responsable, setResponsable] = useState('');
    const [Genero, setGenero] = useState('');

    useEffect(() => {
        if (response) {
            setDocumento(response.Documento || '');
            setNombres(response.Nombres || '');
            setApellidos(response.Apellidos || '');
            setTelefono(response.Telefono || '');
            setCorreo(response.Correo || '');
            setResponsable(response.Tip_responsable || '');
            setGenero(response.Genero || '');
        }
    }, [response]);

    const sendForm = (e) => {
        e.preventDefault();
        const data = { Documento, Nombres, Apellidos, Telefono, Correo, Tip_responsable, Genero };
        onFormSubmit(data);
    };

    return (
        <>
        <form id="responsableForm" action="" onSubmit={sendForm} className="table table-striped">
        <label htmlFor="documento">Documento</label>
        <input type="number" id="documento" value={Fec_Venta} onChange={(e) => setDocumento(e.target.value)} />
        <br />

        <label htmlFor="nombre">Nombres</label>
        <input type="text" id="nombre" value={Nombres} onChange={(e) => setNombres(e.target.value)}/>
        <br />

        <label htmlFor="apellido">Apellidos</label>
        <input type="text" id="apellido" value={Apellidos} onChange={(e) => setApellidos(e.target.value)}/>
        <br />
        <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
        <br />

        <label htmlFor="telefono">Telefono</label>
        <input type="number" id="telefono" value={Telefono} onChange={(e) => setTelefono(e.target.value)}/>
        <br />

        <label htmlFor="correo">Correo</label>
        <input type="email" id="correo" value={Correo} onChange={(e) => setCorreo(e.target.value)}/>
        <br />

        <label htmlFor="tipResponsable">Tipo Responsable</label>
        <input type="text" id="tipResponsable" value={Tip_responsable} onChange={(e) => setResponsable(e.target.value)}/>
        <br />
        
        <label htmlFor="genero">Genero</label>
        <input type="text" id="genero" value={Genero} onChange={(e) => setGenero(e.target.value)}/>
        <br />

    
        </form>
    </>
    );
};

export default FormResponsable;