import { Sequelize } from "sequelize";
import ProductoModel from "../models/productoModel.js";

//muestra todos los registros del producto
export const getAllProductos = async (req, res) => {
	try {
		const productos = await ProductoModel.findAll()
		res.json(productos)
	} catch (error){
		res.json({message: error.message })
	}
}
//mostrar un registro
export const getProducto = async (req, res) => {
	try {
		const producto = await ProductoModel.findAll({
			where: { id: req.params.id}
		})
		res.json(producto[0])
	} catch (error) {
		res.json({message: error.message })
	}
}
//crear un producto
export const createProducto = async (req, res) => {
	try {
		//nuevo
		const{Nom_Producto, Car_Producto, Pre_Promedio, Exi_Producto, Fec_Vencimiento, Pre_Anterior, Uni_DeMedida, Pre_Producto} = req.body
		const Ima_Producto = req.file ? req.file.filename : null
		
		await ProductoModel.create({
			Nom_Producto,
			Car_Producto,
			Pre_Promedio,
			Exi_Producto,
			Ima_Producto,
			Fec_Vencimiento,
			Pre_Anterior,
			Uni_DeMedida,
			Pre_Producto
			
		})
		res.json({"message": "¡Registro De Producto Creado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//Actualizar un registro
export const updateProducto = async (req, res) => {
	try {
		await ProductoModel.update(req.body, { 
			where: {id: req.params.id}
		})
			
		res.json({"message": "¡Registro De Producto Actualizado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//borrar un  registro
export const deleteProducto = async (req, res) => {
	try {
		await ProductoModel.destroy ({ 
			where: {id:req.params.id}
		})
			
		res.json({"message": "¡Registro De Producto Borrado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//consultar player por nom_producto
export const getQueryProducto = async (req, res) => {

	try{
		const producto = await ProductoModel.findAll({
			where: {
				Nom_Producto: {
					[Sequelize.Op.like]: `%${req.params.Nom_Producto}%`
				}
			}
			
		})

		res.json(producto)	
	} catch (error) {
		res.json({ message: error.message})
	}
}