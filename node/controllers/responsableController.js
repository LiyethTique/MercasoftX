import { Sequelize } from 'sequelize';
import ResponsableModel from '../models/responsableModel.js';

// Obtener todos los responsables
export const getAllResponsables = async (req, res) => {
    try {
        const responsables = await ResponsableModel.findAll();
        if (responsables.length > 0) {
            res.status(200).json(responsables);
        } else {
            res.status(404).json({ message: 'No se encontraron responsables' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un responsable por ID
export const getResponsable = async (req, res) => {
    try {
        const responsable = await ResponsableModel.findByPk(req.params.id);
        if (responsable) {
            res.status(200).json(responsable);
        } else {
            res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo responsable
export const createResponsable = async (req, res) => {
    try {
        const responsable = await ResponsableModel.create(req.body);
        res.status(201).json({ message: '¡Registro del responsable creado exitosamente!', responsable });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un responsable
export const updateResponsable = async (req, res) => {
    try {
        const [updated] = await ResponsableModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro del responsable actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un responsable
export const deleteResponsable = async (req, res) => {
    try {
        const deleted = await ResponsableModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro del responsable borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getQueryResponsable = async (req, res) => {
	try {
		const responsable = await ResponsableModel.findAll({
			where: {
				id_Responsable: {
					[Sequelize.Op.like]: `%${req.params.id_Responsable}%`
				}
			}
		});
		if (responsable.length > 0) {
			res.status(200).json(responsable);
		} else {
			res.status(404).json({ message: 'No se encontro responsable con ese id' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
