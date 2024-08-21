import { useState } from 'react';
import { handleCreateTraslado, handleUpdateTraslado, getTrasladoById } from '../../controllers/trasladoController';

const FormQueryTraslado = ({ buttonForm, trasladoData, updateTrasladoList }) => {
    const [traslado, setTraslado] = useState({
        Id_Traslado: trasladoData?.Id_Traslado || '',
        Traslado: trasladoData?.Traslado || '',
        Des_Traslado: trasladoData?.Des_Traslado || '',
        Id_Producto: trasladoData?.Id_Producto || '',
        Can_Producto: trasladoData?.Can_Producto || '',
        Val_Unitario: trasladoData?.Val_Unitario || '',
        Val_Traslado: trasladoData?.Val_Traslado || '',
        Id_Responsable: trasladoData?.Id_Responsable || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraslado({
            ...traslado,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (buttonForm === 'Actualizar') {
                await handleUpdateTraslado(traslado.Id_Traslado, traslado);
            } else {
                await handleCreateTraslado(traslado);
            }
            updateTrasladoList();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFetchTraslado = async (id) => {
        try {
            const fetchedTraslado = await getTrasladoById(id);
            setTraslado(fetchedTraslado);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID Traslado</label>
                <input
                    type="text"
                    name="Id_Traslado"
                    value={traslado.Id_Traslado}
                    onChange={handleChange}
                    disabled={buttonForm === 'Actualizar'}
                />
            </div>
            <div>
                <label>Fecha Traslado</label>
                <input
                    type="date"
                    name="Traslado"
                    value={traslado.Traslado}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Descripción Traslado</label>
                <input
                    type="text"
                    name="Des_Traslado"
                    value={traslado.Des_Traslado}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>ID Producto</label>
                <input
                    type="text"
                    name="Id_Producto"
                    value={traslado.Id_Producto}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Cantidad Producto</label>
                <input
                    type="number"
                    name="Can_Producto"
                    value={traslado.Can_Producto}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Valor Unitario</label>
                <input
                    type="number"
                    step="0.01"
                    name="Val_Unitario"
                    value={traslado.Val_Unitario}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Valor Traslado</label>
                <input
                    type="number"
                    step="0.01"
                    name="Val_Traslado"
                    value={traslado.Val_Traslado}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>ID Responsable</label>
                <input
                    type="text"
                    name="Id_Responsable"
                    value={traslado.Id_Responsable}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">{buttonForm}</button>
        </form>
    );
};

export default FormQueryTraslado;