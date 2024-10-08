import Carrito from "../models/carritoModel.js";
import Producto from "../models/productoModel.js";
import Cliente from "../models/clienteModel.js";

// Mostrar todos los carritos
export const getAllCarrito = async (req, res) => {
    try {
        const carritos = await Carrito.findAll({
            include: [
                { 
                    model: Producto,
                    as: 'producto'  // Alias para la relación con Producto
                },
                {
                    model: Cliente,
                    as: 'cliente'  // Alias para la relación con Cliente
                }
            ]
        });
        if (carritos.length > 0) {
            res.status(200).json(carritos);
        } else {
            res.status(400).json({ message: "No existen carritos" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Mostrar un carrito por ID
export const getCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findByPk(req.params.id, {
            include: [
                { 
                    model: Producto,
                    as: 'producto'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                }
            ]
        });
        if (carrito) {
            res.status(200).json(carrito);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un nuevo carrito
// Crear un nuevo carrito
// Crear un nuevo carrito
export const createCarrito = async (req, res) => {
    const { Id_Producto, Can_Producto, Id_Cliente } = req.body;

    if (!Id_Producto) {
        return res.status(400).json({ message: 'El campo Id_Producto es obligatorio' });
    }

    try {
        const producto = await Producto.findByPk(Id_Producto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Crear el carrito, haciendo que Id_Cliente sea opcional
        const nuevoCarrito = await Carrito.create({
            Id_Producto,
            Can_Producto: Can_Producto || null,  // Valor predeterminado
            Id_Cliente: Id_Cliente || null   // Valor opcional
        });
        
        res.status(201).json({ message: '¡Carrito creado exitosamente!', carrito: nuevoCarrito });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un carrito existente
export const updateCarrito = async (req, res) => {
    const { Id_Producto, Can_Producto, Id_Cliente } = req.body;

    if (!Id_Producto || !Can_Producto || !Id_Cliente) {
        console.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    try {
        const [affectedRows] = await Carrito.update(req.body, {
            where: { Id_Carrito: req.params.id }
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: '¡Carrito actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Borrar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const deleted = await Carrito.destroy({
            where: { Id_Carrito: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Carrito borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
