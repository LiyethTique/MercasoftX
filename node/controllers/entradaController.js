import { Sequelize } from 'sequelize';
import EntradaModel from '../models/entradaModel.js';

// Obtener todas las entradas
export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await EntradaModel.findAll();
        if (entradas.length > 0) {
            res.status(200).json(entradas);
        } else {
            res.status(404).json({ message: 'No se encontraron entradas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una entrada por ID
export const getEntrada = async (req, res) => {
    try {
        const entrada = await EntradaModel.findByPk(req.params.id);
        if (entrada) {
            res.status(200).json(entrada);
        } else {
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva entrada
export const createEntrada = async (req, res) => {
    try {
        const entrada = await EntradaModel.create(req.body);
        res.status(201).json({ message: '¡Registro de entrada creado exitosamente!', entrada });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una entrada
export const updateEntrada = async (req, res) => {
    try {
        const [updated] = await EntradaModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de entrada actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar una entrada
export const deleteEntrada = async (req, res) => {
    try {
        const deleted = await EntradaModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro de entrada borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryEntrada = async (req, res) => {
	try {
		const entrada = await EntradaModel.findAll({
			where: {
				id_Entrada: {
					[Sequelize.Op.like]: `%${req.params.id_Entrada}%`
				}
			}
		});
		if (entrada.length > 0) {
			res.status(200).json(entrada);
		} else {
			res.status(404).json({ message: 'No se encontro entrada con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};