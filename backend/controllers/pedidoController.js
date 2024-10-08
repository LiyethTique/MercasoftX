import PedidoModel from "../models/pedidoModel.js";
import Cliente from "../models/clienteModel.js"
import logger from "../logs/logger.js";

// Mostrar todos los registros
export const getAllPedido = async (req, res, next) => {
    try {
        const pedidos = await PedidoModel.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'cliente',
                }
            ]
        });
        logger.info('Todos los pedidos recuperados');
        if(pedidos.length > 0){
            res.status(200).json(pedidos);
            return
        }
        res.status(400).json({ message: "No existen Pedidos" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        logger.error(`Error al recuperar todos los pedidos: ${error.message}`);
        next(error);
    }
};

// Mostrar un registro
export const getPedido = async (req, res, next) => {
    try {
        const pedido = await PedidoModel.findByPk(req.params.id, {
            include: [
                {
                    model: Cliente,
                    as: 'cliente',
                }
            ]
        });
        if (pedido) {
            logger.info(`Pedido recuperado: ${pedido.Id_Pedido}`);
            res.status(200).json(pedido);
        } else {
            logger.warn(`Pedido no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al recuperar el pedido: ${error.message}`);
        next(error);
    }
};

// Crear un pedido
export const createPedido = async (req, res, next) => {

    const { Fec_Pedido, Id_Cliente, Est_Pedido, Val_Pedido } = req.body;

    if (!Fec_Pedido || !Id_Cliente || !Est_Pedido || !Val_Pedido) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevoPedido = await PedidoModel.create(req.body);
        logger.info(`Pedido creado: ${nuevoPedido.Id_Pedido}`);
        res.status(201).json({ message: '¡Pedido creado exitosamente!', pedido: nuevoPedido });
    } catch (error) {
        logger.error(`Error al crear el pedido: ${error.message}`);
        next(error);
    }
};

// Actualizar un registro
export const updatePedido = async (req, res, next) => {

    const { Fec_Pedido, Id_Cliente, Est_Pedido, Val_Pedido } = req.body;

    if (!Fec_Pedido || !Id_Cliente || !Est_Pedido || !Val_Pedido) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await PedidoModel.update(req.body, {
            where: { Id_Pedido: req.params.id }
        });
        if (updated) {
            logger.info(`Pedido actualizado: ${req.params.id}`);
            res.status(200).json({ message: '¡Pedido actualizado exitosamente!' });
        } else {
            logger.warn(`Pedido no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al actualizar el pedido: ${error.message}`);
        next(error);
    }
};

// Borrar un registro
export const deletePedido = async (req, res, next) => {
    try {
        const deleted = await PedidoModel.destroy({
            where: { Id_Pedido: req.params.id }
        });
        if (deleted) {
            logger.info(`Pedido borrado: ${req.params.id}`);
            res.status(200).json({ message: '¡Pedido borrado exitosamente!' });
        } else {
            logger.warn(`Pedido no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al borrar el pedido: ${error.message}`);
        next(error);
    }
};

