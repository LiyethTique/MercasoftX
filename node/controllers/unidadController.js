import { Sequelize } from 'sequelize';
import UnidadModel from '../models/unidadModel.js';

// Obtener todas las unidades
export const getAllUnidades = async (req, res) => {
    try {
        const unidades = await UnidadModel.findAll();
        if (unidades.length > 0) {
            res.status(200).json(unidades);
        } else {
            res.status(404).json({ message: 'No se encontraron unidades' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una unidad por ID
export const getUnidad = async (req, res) => {
    try {
        const unidad = await UnidadModel.findByPk(req.params.id);
        if (unidad) {
            res.status(200).json(unidad);
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva unidad
export const createUnidad = async (req, res) => {
    try {
        const unidad = await UnidadModel.create(req.body);
        res.status(201).json({ message: '¡Registro de unidad creado exitosamente!', unidad });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una unidad
export const updateUnidad = async (req, res) => {
    try {
        const [updated] = await UnidadModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de unidad actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar una unidad
export const deleteUnidad = async (req, res) => {
    try {
        const deleted = await UnidadModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de unidad borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryUnidad = async (req, res) => {
	try {
		const unidad = await UnidadModel.findAll({
			where: {
				id_Unidad: {
					[Sequelize.Op.like]: `%${req.params.id_Unidad}%`
				}
			}
		});
		if (unidad.length > 0) {
			res.status(200).json(unidad);
		} else {
			res.status(404).json({ message: 'No se encontro la unidad con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};