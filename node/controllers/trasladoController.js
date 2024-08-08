import { Sequelize } from 'sequelize';
import TrasladoModel from '../models/trasladoModel.js';

// Obtener todos los traslados
export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await TrasladoModel.findAll();
        if (traslados.length > 0) {
            res.status(200).json(traslados);
        } else {
            res.status(404).json({ message: 'No se encontraron traslados' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un traslado por ID
export const getTraslado = async (req, res) => {
    try {
        const traslado = await TrasladoModel.findByPk(req.params.id);
        if (traslado) {
            res.status(200).json(traslado);
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo traslado
export const createTraslado = async (req, res) => {
    try {
        const traslado = await TrasladoModel.create(req.body);
        res.status(201).json({ message: '¡Registro de traslado creado exitosamente!', traslado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un traslado
export const updateTraslado = async (req, res) => {
    try {
        const [updated] = await TrasladoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de traslado actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un traslado
export const deleteTraslado = async (req, res) => {
    try {
        const deleted = await TrasladoModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de traslado borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryTraslado = async (req, res) => {
	try {
		const traslado = await TrasladoModel.findAll({
			where: {
				id_Traslado: {
					[Sequelize.Op.like]: `%${req.params.id_Traslado}%`
				}
			}
		});
		if (traslado.length > 0) {
			res.status(200).json(traslado);
		} else {
			res.status(404).json({ message: 'No se encontro el traslado con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};