import Traslado from "../models/trasladoModel.js";
import Producto from "../models/productoModel.js";
import Responsable from "../models/responsableModel.js"; // Si tienes un modelo para Responsable

// Mostrar todos los registros
// Mostrar todos los registros
export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await Traslado.findAll({
            include: [
                {
                    model: Producto,
                    as: 'producto'  // Alias, si usas uno diferente, cámbialo aquí
                },
                {
                    model: Responsable,
                    as: 'responsable' // Alias, si usas uno diferente, cámbialo aquí
                }
            ]
        });

        console.log(traslados);

        if (traslados.length > 0) {
            res.status(200).json(traslados);
        } else {
            // Cambiamos el estado a 200 ya que la solicitud fue exitosa, pero no hay registros.
            res.status(200).json([]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


// Mostrar un registro
export const getTraslado = async (req, res) => {
    try {
        const traslado = await Traslado.findByPk(req.params.id, {
            include: [
                {
                    model: Producto,
                    as: 'producto'  // Alias, si usas uno diferente, cámbialo aquí
                },
                {
                    model: Responsable,
                    as: 'responsable' // Alias, si usas uno diferente, cámbialo aquí
                }
            ]
        });
        if (traslado) {
            res.status(200).json(traslado);
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un Traslado
export const createTraslado = async (req, res) => {
    const { Fec_Traslado, Des_Traslado, Id_Producto, Can_Producto, Val_Unitario, Val_Traslado, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Des_Traslado || !Id_Producto || !Can_Producto || !Val_Unitario || !Val_Traslado || !Id_Responsable) {
        console.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevoTraslado = await Traslado.create(req.body);
        if (nuevoTraslado.Id_Traslado) {
            res.status(201).json({ message: '¡Registro Creado Exitosamente!', traslado: nuevoTraslado });
        } else {
            res.status(400).json({ message: '¡Ocurrió un error con la creación!', traslado: nuevoTraslado });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Actualizar un registro 
export const updateTraslado = async (req, res) => {
    const { Fec_Traslado, Des_Traslado, Id_Producto, Can_Producto, Val_Unitario, Val_Traslado, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Des_Traslado || !Id_Producto || !Can_Producto || !Val_Unitario || !Val_Traslado || !Id_Responsable) {
        console.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    try {
        const [affectedRows] = await Traslado.update(req.body, {
            where: { Id_Traslado: req.params.id }
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: '¡Registro Actualizado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Borrar un registro
export const deleteTraslado = async (req, res) => {
    try {
        const deleted = await Traslado.destroy({
            where: { Id_Traslado: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro Borrado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}