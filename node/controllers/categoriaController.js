import { Sequelize } from 'sequelize';
import CategoriaModel from '../models/categoriaModel.js';

// Obtener todas las categorías
export const getAllCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.findAll();
        if (categorias.length > 0) {
            res.status(200).json(categorias);
        } else {
            res.status(404).json({ message: 'No se encontraron categorías' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una categoría por ID
export const getCategoria = async (req, res) => {
    try {
        const categoria = await CategoriaModel.findByPk(req.params.id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
    try {
        const categoria = await CategoriaModel.create(req.body);
        res.status(201).json({ message: '¡Registro de categoría creado exitosamente!', categoria });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una categoría
export const updateCategoria = async (req, res) => {
    try {
        const [updated] = await CategoriaModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro de categoría actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar una categoría
export const deleteCategoria = async (req, res) => {


	try {
		const deleted = await CategoriaModel.destroy({
			where: { id: req.params.id }
		});
	    if (deleted) {
			res.status(200).json({ message: '¡Registro del categoria borrado exitosamente!' });
		} else {
			res.status(404).json({ message: 'Categoria no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
				
// Consultar categoria por nombre
export const getQueryCategoria = async (req, res) => {
	try {
		const categoria = await CategoriaModel.findAll({
			where: {
				Nom_Categoria: {
					[Sequelize.Op.like]: `%${req.params.Nom_Categoria}%`
				}
			}
		});
		if (clientes.length > 0) {
			res.status(200).json(categoria);
		} else {
			res.status(404).json({ message: 'No se encontraron categorias con ese nombre' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};