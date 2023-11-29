const Persona = require('../models/persona.model')
const Vehiculo = require('../models/vehiculos.model')

const {FormData} =require('formdata-node')
const form = new FormData()
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const vehiculos_post = async (req, res) => {
    const { marca,
        modelo,
        placa,
        year_vehiculo,      
        uid_cliente } = req.body
  

    try {
        
        const unCliente = await Persona.findByPk(uid_cliente)
        const { tipo_persona } = unCliente
        console.log('TIPO PERSONA: ',tipo_persona)
        
        
        // if (tipo_persona == 'cliente') {
        //     if (req.files && Object.keys(req.files).length !== 0 && req.files.archivo) {
        //         const { tempFilePath } = req.files.archivo
        //         //const { bytes, secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: 'taller' })
        //         const cloudinary = await cloudinary.uploader.upload(tempFilePath, { folder: 'taller' })
        //         res.json(cloudinary)
        //     } else {
        //         const nuevoVehiculo = await Vehiculo.create({
        //             marca,
        //             modelo,
        //             placa,
        //             year_vehiculo,
        //             img_url:'',
        //             uid_cliente
        //         })
        //         return res.json(nuevoVehiculo)
        //     }
        // } else {
        //     return res.status(400).json({
        //         mensaje: 'El usuario no es un cliente'
        //     })
        // }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear un vehiculo'
        })
    }
}

// const nuevoVehiculo = await Vehiculo.create({
//     marca,
//     modelo,
//     placa,
//     year_vehiculo,
//     uid_cliente
// })
// return res.json(nuevoVehiculo)
const vehiculos_get_cliente = async (req, res) => { }

module.exports = { vehiculos_get_cliente, vehiculos_post }