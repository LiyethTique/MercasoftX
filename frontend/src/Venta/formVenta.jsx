import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const FormVenta = ({ buttonForm, venta, URI, updateTextButton, setIsFormVisible }) => {
    const [Fec_Venta, setFecha] = useState('');
    const [Val_Venta, setValor] = useState('');
    const [Id_Pedido, setId_Pedido] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const modalCloseButtonRef = useRef(null); // Ref para el botón de cierre del modal

    const sendForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const data = {
            Fec_Venta,
            Val_Venta: parseFloat(Val_Venta),
            Id_Pedido
        };

        if (!URI) {
            setError("La URL de la API no está definida.");
            setIsSubmitting(false);
            return;
        }

        const url = buttonForm === 'Actualizar'
            ? `${URI}/${venta.Id_Venta}`.replace(/\/+$/, '')
            : URI;

        const method = buttonForm === 'Actualizar' ? axios.put : axios.post;

        try {
            console.log('Datos enviados:', data);
            console.log('URL de la solicitud:', url);
            
            const response = await method(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                updateTextButton('Enviar');
                clearForm();
                if (typeof setIsFormVisible === 'function') {
                    setIsFormVisible(false);
                }

                // Cerrar modal usando ref
                if (modalCloseButtonRef.current) {
                    modalCloseButtonRef.current.click();
                } else {
                    console.error("No se encontró el botón para cerrar el modal.");
                }
            } else {
                setError(response.data?.message || "Error al procesar la solicitud");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error.message || 'Error desconocido');
            setError(error.response?.data?.message || "Error al procesar la solicitud");
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setFecha('');
        setValor('');
        setId_Pedido('');
    };

    const setData = () => {
        if (venta) {
            setFecha(venta.Fec_Venta || '');
            setValor(venta.Val_Venta || '');
            setId_Pedido(venta.Id_Pedido || '');
        }
    };

    useEffect(() => {
        setData();
    }, [venta]);

    return (
        <form id="ventaForm" onSubmit={sendForm} className="table table-striped">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="fechaVenta" className="form-label">Fecha Venta</label>
                <input 
                    type="date" 
                    id="fechaVenta" 
                    className="form-control" 
                    value={Fec_Venta} 
                    required 
                    onChange={(e) => setFecha(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="valorVenta" className="form-label">Valor Venta</label>
                <input 
                    type="number" 
                    id="valorVenta" 
                    className="form-control" 
                    value={Val_Venta} 
                    required 
                    onChange={(e) => setValor(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="codigoPedido" className="form-label">Código del pedido</label>
                <input 
                    type="number" 
                    id="codigoPedido" 
                    className="form-control" 
                    value={Id_Pedido} 
                    required 
                    onChange={(e) => setId_Pedido(e.target.value)} 
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
                    if (typeof setIsFormVisible === 'function') {
                        setIsFormVisible(false);
                    }
                    // Usar ref para cerrar el modal
                    if (modalCloseButtonRef.current) {
                        modalCloseButtonRef.current.click();
                    }
                }}
                ref={modalCloseButtonRef} // Asignar ref al botón de cierre
            >
                Cerrar
            </button>
        </form>
    );
};

export default FormVenta;
