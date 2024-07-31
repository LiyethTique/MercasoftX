import { Model, Sequelize } from "sequelize";
import ClienteModel from "../models/clienteModel.js";

//muestra todos los registros del cliente
export const getAllClientes = async (req, res) => {
	try {
		const clientes = await ClienteModel.findAll()
		res.json(clientes)
	} catch (error) {
		res.json({message: error.message })
	}
	
}
//mostrar un registro
export const getCliente = async (req, res) => {
	try {
		const cliente = await ClienteModel.findAll({
			where: { id: req.params.id}
		})
		res.json(cliente[0])
	} catch (error) {
		res.json({message: error.message })
	}
}
//crear un cliente
export const createCliente = async (req, res) => {
	try {
		await ClienteModel.create(req.body)
		res.json({"message": "¡Registro Del Cliente Creado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//Actualizar un registro
export const updateCliente = async (req, res) => {
	try {
		await ClienteModel.update(req.body, { 
			where: {id: req.params.id}
		})
			
		res.json({"message": "¡Registro Del Cliente Actualizado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//borrar un  registro
export const deleteCliente = async (req, res) => {
	try {
		await ClienteModel.destroy ({ 
			where: {id:req.params.id}
		})
			
		res.json({"message": "¡Registro Del Cliente Borrado Exitosamente!"})	
	} catch (error) {
		res.json({message: error.message})
	}
}
//FALTAAAAAAAAAA  consultar player por nom_Cliente
export const getQueryCliente = async (req, res) => {
	try{
		const cliente = await ClienteModel.findAll({
			where: {
				Nom_Cliente: {
					[Sequelize.Op.like]: `%${req.params.Nom_Cliente}%` 
					
				}
			}
			
		})

		res.json(cliente)	
	} catch (error) {
		res.json({ message: error.message})
	}
}