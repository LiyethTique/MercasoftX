import React from 'react';

const FormQueryPedido = ({ pedidos, onEdit, onDelete }) => {
    return (
        <div className="mt-4">
            <h2 className="mb-4">Lista de Pedidos</h2>
            <ul className="list-group">
                {pedidos.map((pedido) => (
                    <li key={pedido.Id_Pedido} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            {pedido.Fec_Pedido} - {pedido.Est_Pedido} - {pedido.Val_Pedido}
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-outline-secondary mr-2"
                                onClick={() => onEdit(pedido)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onDelete(pedido.Id_Pedido)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormQueryPedido;
