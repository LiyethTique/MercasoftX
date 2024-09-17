import Venta from "../models/ventaModel.js";
import Pedido from "../models/pedidoModel.js";

// Mostrar todos los registros
// Mostrar todos los registros
export const getAllVenta = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [{ 
                model: Pedido,
                as: 'pedido',  // Alias corregido
            }]
        });
        console.log(ventas);
        if (ventas.length > 0) {
            res.status(200).json(ventas);
        } else {
            res.status(400).json({ message: "No existen Ventas" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Mostrar un registro
export const getVenta = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [{ 
                model: Pedido,
                as: 'pedido',  // Alias corregido
            }]
        });
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear una Venta
export const createVenta = async (req, res) => {

    const { Fec_Venta, Val_Venta, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Id_Pedido) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {

        const nuevaVenta = await Venta.create(req.body);
        if (nuevaVenta.Id_Venta) {
            res.status(201).json({ message: '¡Registro Creado Exitosamente!', venta: nuevaVenta });
            return
        }
        console.log(nuevaVenta)
        res.status(400).json({ message: '¡Ocurrio un error con la creacion!', venta: nuevaVenta });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Actualizar un registro 
export const updateVenta = async (req, res) => {

    const { Fec_Venta, Val_Venta, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Id_Pedido) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    try {
        const [affectedRows] = await Venta.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: '¡Registro Actualizado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Borrar un registro
export const deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.destroy({
            where: { id: req.params.id }
        });
        if (deletedVenta) {
            res.status(200).json({ message: '¡Registro Borrado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}