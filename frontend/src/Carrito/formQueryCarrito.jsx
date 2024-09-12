import { useState } from 'react';

const FormQueryCarrito = ({ URI, getCarrito, deleteCarrito }) => {
    const [idCarrito, setIdCarrito] = useState('');

    const handleQuery = () => {
        getCarrito(idCarrito);
    };

    return (
        <div>
            <div className="form-group">
                <label>ID Carrito</label>
                <input
                    type="number"
                    className="form-control"
                    value={idCarrito}
                    onChange={(e) => setIdCarrito(e.target.value)}
                />
            </div>
            <button onClick={handleQuery} className="btn btn-primary">Consultar</button>
            <button onClick={() => deleteCarrito(idCarrito)} className="btn btn-danger">Eliminar</button>
        </div>
    );
};

export default FormQueryCarrito;