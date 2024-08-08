import { Sequelize } from 'sequelize';
import ProductoModel from '../models/productoModel.js';

// Obtener todos los productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll();
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No se encontraron productos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un producto por ID
export const getProducto = async (req, res) => {
    try {
        const producto = await ProductoModel.findByPk(req.params.id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    try {
        const producto = await ProductoModel.create(req.body);
        res.status(201).json({ message: '¡Registro del producto creado exitosamente!', producto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    try {
        const [updated] = await ProductoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro del producto actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un producto
export const deleteProducto = async (req, res) => {
    try {
        const deleted = await ProductoModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro del producto borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultar productos por nombre
export const getQueryProducto = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll({
            where: {
                Nom_Producto: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Producto}%`
                }
            }
        });
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
