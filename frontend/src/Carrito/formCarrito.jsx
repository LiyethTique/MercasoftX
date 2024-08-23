import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const FormCarrito = ({ buttonForm, carrito, URI, updateTextButton }) => {
    const [canProducto, setCanProducto] = useState(carrito.Can_Producto);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (buttonForm === 'Enviar') {
                await axios.post(URI, { Can_Producto: canProducto });
                Swal.fire('¡Éxito!', 'El registro ha sido creado.', 'success');
            } else {
                await axios.put(URI + carrito.Id_Carrito, { Can_Producto: canProducto });
                Swal.fire('¡Éxito!', 'El registro ha sido actualizado.', 'success');
            }
            updateTextButton('Enviar');
        } catch (error) {
            Swal.fire('Error', error.response.data.message, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Can_Producto</label>
                <input
                    type="number"
                    className="form-control"
                    value={canProducto}
                    onChange={(e) => setCanProducto(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">{buttonForm}</button>
        </form>
    );
};

export default FormCarrito;