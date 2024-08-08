import { Sequelize } from 'sequelize';
import CarritoModel from '../models/carritoModel.js';

// Obtener todos los carritos
export const getAllCarritos = async (req, res) => {
    try {
        const carritos = await CarritoModel.findAll();
        if (carritos.length > 0) {
            res.status(200).json(carritos);
        } else {
            res.status(404).json({ message: 'No se encontraron carritos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un carrito por ID
export const getCarrito = async (req, res) => {
    try {
        const carrito = await CarritoModel.findByPk(req.params.id);
        if (carrito) {
            res.status(200).json(carrito);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo carrito
export const createCarrito = async (req, res) => {
    try {
        const carrito = await CarritoModel.create(req.body);
        res.status(201).json({ message: '¡Registro del carrito creado exitosamente!', carrito });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un carrito
export const updateCarrito = async (req, res) => {
    try {
        const [updated] = await CarritoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro del carrito actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const deleted = await CarritoModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro del carrito borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryCarrito = async (req, res) => {
	try {
		const carrito = await CarritoModel.findAll({
			where: {
				id_Carrito: {
					[Sequelize.Op.like]: `%${req.params.id_Carrito}%`
				}
			}
		});
		if (carrito.length > 0) {
			res.status(200).json(carrito);
		} else {
			res.status(404).json({ message: 'No se encontro carrito con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};