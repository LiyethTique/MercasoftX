import axios from 'axios';
import { useState, useEffect } from 'react';

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton, setIsFormVisible }) => {
    const [Nom_Responsable, setNom_Responsable] = useState('');
    const [Cor_Responsable, setCor_Responsable] = useState('');
    const [Tel_Responsable, setTel_Responsable] = useState('');
    const [Tip_Responsable, setTip_Responsable] = useState('');
    const [Tip_Genero, setTip_Genero] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null); // Agregar estado para manejar errores

    const sendForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null); // Limpiar errores antes de enviar

        const data = {
            Nom_Responsable,
            Cor_Responsable,
            Tel_Responsable,
            Tip_Responsable,
            Tip_Genero
        };

        const url = buttonForm === 'Actualizar'
            ? `${URI}${responsable.Id_Responsable}`
            : URI;

        const method = buttonForm === 'Actualizar' ? axios.put : axios.post;

        try {
            await method(url, data);
            updateTextButton('Enviar');
            clearForm();
            setIsFormVisible(false); // Ocultar modal tras registro/actualización exitosa
            document.querySelector('[data-bs-dismiss="modal"]').click(); // Cerrar modal manualmente
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "Error al guardar"); // Mostrar error en el estado
        } finally {
            setIsSubmitting(false);
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
        <form id="responsableForm" onSubmit={sendForm} className="table table-striped">
            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}
            <div className="mb-3">
                <label htmlFor="nomResponsable" className="form-label">Nombre</label>
                <input 
                    type="text" 
                    id="nomResponsable" 
                    className="form-control" 
                    value={Nom_Responsable} 
                    required 
                    onChange={(e) => setNom_Responsable(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="corResponsable" className="form-label">Correo</label>
                <input 
                    type="email" 
                    id="corResponsable" 
                    className="form-control" 
                    value={Cor_Responsable} 
                    required 
                    onChange={(e) => setCor_Responsable(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="telResponsable" className="form-label">Teléfono</label>
                <input 
                    type="text" 
                    id="telResponsable" 
                    className="form-control" 
                    value={Tel_Responsable} 
                    required 
                    onChange={(e) => setTel_Responsable(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="tipResponsable" className="form-label">Tipo de Responsable</label>
                <input 
                    type="text" 
                    id="tipResponsable" 
                    className="form-control" 
                    value={Tip_Responsable} 
                    required 
                    onChange={(e) => setTip_Responsable(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="tipGenero" className="form-label">Género</label>
                <input 
                    type="text" 
                    id="tipGenero" 
                    className="form-control" 
                    value={Tip_Genero} 
                    required 
                    onChange={(e) => setTip_Genero(e.target.value)} 
                />
            </div>

            <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : buttonForm}
            </button>
            <button 
                type="button" 
                className="btn btn-secondary ms-2" 
                onClick={() => {
                    clearForm();
                    setIsFormVisible(false); // Ocultar formulario al cancelar
                    document.querySelector('[data-bs-dismiss="modal"]').click(); // Cerrar modal manualmente
                }}
            >
                Cancelar
            </button>
        </form>
    );
};

export default FormResponsable;
