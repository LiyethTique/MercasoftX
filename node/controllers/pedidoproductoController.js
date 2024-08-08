import { Sequelize } from 'sequelize';
import PedidoProductoModel from '../models/pedidoproductoModel.js';

// Obtener todos los pedidos de productos
export const getAllPedidoProductos = async (req, res) => {
    try {
        const pedidoProductos = await PedidoProductoModel.findAll();
        if (pedidoProductos.length > 0) {
            res.status(200).json(pedidoProductos);
        } else {
            res.status(404).json({ message: 'No se encontraron pedidos de productos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pedido de producto por ID
export const getPedidoProducto = async (req, res) => {
    try {
        const pedidoProducto = await PedidoProductoModel.findByPk(req.params.id);
        if (pedidoProducto) {
            res.status(200).json(pedidoProducto);
        } else {
            res.status(404).json({ message: 'Pedido de producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo pedido de producto
export const createPedidoProducto = async (req, res) => {
    try {
        const pedidoProducto = await PedidoProductoModel.create(req.body);
        res.status(201).json({ message: '¡Registro de pedido de producto creado exitosamente!', pedidoProducto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un pedido de producto
export const updatePedidoProducto = async (req, res) => {
    try {
        const [updated] = await PedidoProductoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de pedido de producto actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Pedido de producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un pedido de producto
export const deletePedidoProducto = async (req, res) => {
    try {
        const deleted = await PedidoProductoModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de pedido de producto borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Pedido de producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryPedidoProducto = async (req, res) => {
	try {
		const pedidoProducto = await PedidoProductoModel.findAll({
			where: {
				id_PedidoProducto: {
					[Sequelize.Op.like]: `%${req.params.id_PedidoProducto}%`
				}
			}
		});
		if (pedidoProducto.length > 0) {
			res.status(200).json(pedidoProducto);
		} else {
			res.status(404).json({ message: 'No se encontro el pedido del producto con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};