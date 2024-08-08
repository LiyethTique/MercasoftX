import { Sequelize } from 'sequelize';
import VentaModel from '../models/ventaModel.js';

// Obtener todas las ventas
export const getAllVentas = async (req, res) => {
    try {
        const ventas = await VentaModel.findAll();
        if (ventas.length > 0) {
            res.status(200).json(ventas);
        } else {
            res.status(404).json({ message: 'No se encontraron ventas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una venta por ID
export const getVenta = async (req, res) => {
    try {
        const venta = await VentaModel.findByPk(req.params.id);
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva venta
export const createVenta = async (req, res) => {
    try {
        const venta = await VentaModel.create(req.body);
        res.status(201).json({ message: '¡Registro de venta creado exitosamente!', venta });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una venta
export const updateVenta = async (req, res) => {
    try {
        const [updated] = await VentaModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de venta actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar una venta
export const deleteVenta = async (req, res) => {
    try {
        const deleted = await VentaModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de venta borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryVenta = async (req, res) => {
	try {
		const venta = await VentaModel.findAll({
			where: {
				id_Venta: {
					[Sequelize.Op.like]: `%${req.params.id_Venta}%`
				}
			}
		});
		if (venta.length > 0) {
			res.status(200).json(venta);
		} else {
			res.status(404).json({ message: 'No se encontro la venta con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};