import { Sequelize } from 'sequelize';
import PedidoModel from '../models/pedidoModel.js';

// Obtener todos los pedidos
export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll();
        if (pedidos.length > 0) {
            res.status(200).json(pedidos);
        } else {
            res.status(404).json({ message: 'No se encontraron pedidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pedido por ID
export const getPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.findByPk(req.params.id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo pedido
export const createPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.create(req.body);
        res.status(201).json({ message: '¡Registro de pedido creado exitosamente!', pedido });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un pedido
export const updatePedido = async (req, res) => {
    try {
        const [updated] = await PedidoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de pedido actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un pedido
export const deletePedido = async (req, res) => {
    try {
        const deleted = await PedidoModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de pedido borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryPedido = async (req, res) => {
	try {
		const pedido = await PedidoModel.findAll({
			where: {
				id_Pedido: {
					[Sequelize.Op.like]: `%${req.params.id_Pedido}%`
				}
			}
		});
		if (pedido.length > 0) {
			res.status(200).json(pedido);
		} else {
			res.status(404).json({ message: 'No se encontro el pedido con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
