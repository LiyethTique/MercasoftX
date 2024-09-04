import axios from "axios";
import { useState, useEffect } from "react";

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton }) => {
    const [Nom_Responsable, setNom_Responsable] = useState('');
    const [Cor_Responsable, setCor_Responsable] = useState('');
    const [Tel_Responsable, setTel_Responsable] = useState('');
    const [Tip_Responsable, setTip_Responsable] = useState('');
    const [Tip_Genero, setTip_Genero] = useState('');

    // Estado para controlar la visibilidad del formulario
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendForm = (e) => {
        e.preventDefault();

        setIsSubmitting(true); // Marcar como en proceso de envío

        if (buttonForm === 'Actualizar') {
            axios.put(`${URI}${responsable.Id_Responsable}`, {
                Nom_Responsable,
                Cor_Responsable,
                Tel_Responsable,
                Tip_Responsable,
                Tip_Genero
            })
            .then(() => {
                updateTextButton('Enviar');
                clearForm();
                // Solo ocultar el formulario si la acción fue exitosa
                // setIsFormVisible(false); // No ocultar automáticamente
            })
            .catch(error => {
                console.log("Error updating:", error);
                alert(error.response?.data?.message || "Error al actualizar");
            })
            .finally(() => {
                setIsSubmitting(false); // Marcar como no en proceso de envío
            });
        } else if (buttonForm === 'Enviar') {
            axios.post(URI, {
                Nom_Responsable,
                Cor_Responsable,
                Tel_Responsable,
                Tip_Responsable,
                Tip_Genero
            })
            .then(() => {
                clearForm();
                // Solo ocultar el formulario si la acción fue exitosa
                // setIsFormVisible(false); // No ocultar automáticamente
            })
            .catch(error => {
                console.log("Error posting:", error);
                alert(error.response?.data?.message || "Error al guardar");
            })
            .finally(() => {
                setIsSubmitting(false); // Marcar como no en proceso de envío
            });
        }
    };

    const clearForm = () => {
        setNom_Responsable('');
        setCor_Responsable('');
        setTel_Responsable('');
        setTip_Responsable('');
        setTip_Genero('');
    };

    const setData = () => {
        if (responsable) {
            setNom_Responsable(responsable.Nom_Responsable || '');
            setCor_Responsable(responsable.Cor_Responsable || '');
            setTel_Responsable(responsable.Tel_Responsable || '');
            setTip_Responsable(responsable.Tip_Responsable || '');
            setTip_Genero(responsable.Tip_Genero || '');
        }
    };

    useEffect(() => {
        setData();
    }, [responsable]);

    return (
        <>
            {/* Botón para mostrar el formulario */}
            <center>
                <button 
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
                    className="btn btn-primary"
                >
                    {isFormVisible ? 'Ocultar Formulario' : 'Registrar Responsable'}
                </button>
            </center>

            {/* Mostrar el formulario solo si isFormVisible es true */}
            {isFormVisible && (
                <form id="responsableForm" action="" onSubmit={sendForm} className="table table-striped">
                    <label htmlFor="nomResponsable">Nombre</label>
                    <input 
                        type="text" 
                        id="nomResponsable" 
                        value={Nom_Responsable} 
                        required 
                        onChange={(e) => setNom_Responsable(e.target.value)} 
                    />
                    <br />

                    <label htmlFor="corResponsable">Correo</label>
                    <input 
                        type="email" 
                        id="corResponsable" 
                        value={Cor_Responsable} 
                        required 
                        onChange={(e) => setCor_Responsable(e.target.value)} 
                    />
                    <br />

                    <label htmlFor="telResponsable">Teléfono</label>
                    <input 
                        type="text" 
                        id="telResponsable" 
                        value={Tel_Responsable} 
                        required 
                        onChange={(e) => setTel_Responsable(e.target.value)} 
                    />
                    <br />

                    <label htmlFor="tipResponsable">Tipo de Responsable</label>
                    <input 
                        type="text" 
                        id="tipResponsable" 
                        value={Tip_Responsable} 
                        required 
                        onChange={(e) => setTip_Responsable(e.target.value)} 
                    />
                    <br />

                    <label htmlFor="tipGenero">Género</label>
                    <input 
                        type="text" 
                        id="tipGenero" 
                        value={Tip_Genero} 
                        required 
                        onChange={(e) => setTip_Genero(e.target.value)} 
                    />
                    <br />
                    <br/>
                    <input 
                        type="submit" 
                        id="boton" 
                        value={isSubmitting ? 'Enviando...' : buttonForm} 
                        className="btn btn-success" 
                        disabled={isSubmitting} 
                    />
                </form>
            )}
        </>
    );
};

export default FormResponsable;
