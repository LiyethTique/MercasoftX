import React, { useState, useEffect } from 'react';

const FormPedido = ({ onSubmit, pedido }) => {
    const [formData, setFormData] = useState({
        Fec_Pedido: '',
        Id_Cliente: '',
        Est_Pedido: '',
        Val_Pedido: ''
    });

    useEffect(() => {
        if (pedido) {
            setFormData(pedido);
        }
    }, [pedido]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            Fec_Pedido: '',
            Id_Cliente: '',
            Est_Pedido: '',
            Val_Pedido: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <div className="form-group">
                <label htmlFor="Fec_Pedido">Fecha del Pedido</label>
                <input
                    type="date"
                    className="form-control"
                    id="Fec_Pedido"
                    name="Fec_Pedido"
                    value={formData.Fec_Pedido}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Id_Cliente">ID del Cliente</label>
                <input
                    type="number"
                    className="form-control"
                    id="Id_Cliente"
                    name="Id_Cliente"
                    value={formData.Id_Cliente}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Est_Pedido">Estado del Pedido</label>
                <input
                    type="text"
                    className="form-control"
                    id="Est_Pedido"
                    name="Est_Pedido"
                    value={formData.Est_Pedido}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Val_Pedido">Valor del Pedido</label>
                <input
                    type="number"
                    className="form-control"
                    id="Val_Pedido"
                    name="Val_Pedido"
                    value={formData.Val_Pedido}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {pedido ? 'Actualizar' : 'Crear'} Pedido
            </button>
        </form>
    );
};

export default FormPedido;
