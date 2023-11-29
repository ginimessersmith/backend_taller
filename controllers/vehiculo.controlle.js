const Persona = require('../models/persona.model')
const Vehiculo = require('../models/vehiculos.model')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
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



        if (tipo_persona == 'cliente') {
            if (req.files && Object.keys(req.files).length !== 0 && req.files.archivo) {
                const { tempFilePath } = req.files.archivo
                const cloud = await cloudinary.uploader.upload(tempFilePath, { folder: 'taller' })
                const { secure_url } = cloud
                const nuevoVehiculo = await Vehiculo.create({
                    marca,
                    modelo,
                    placa,
                    year_vehiculo,
                    img_url: secure_url,
                    uid_cliente
                })
                return res.json(nuevoVehiculo)

            } else {
                const nuevoVehiculo = await Vehiculo.create({
                    marca,
                    modelo,
                    placa,
                    year_vehiculo,
                    img_url: '',
                    uid_cliente
                })
                return res.json(nuevoVehiculo)
            }
        } else {
            return res.status(400).json({
                mensaje: 'El usuario no es un cliente'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear un vehiculo'
        })
    }
}


const vehiculos_get_cliente = async (req, res) => {
    const { uid_cliente } = req.params;
    try {

        const listaVehiculos = await Vehiculo.findAll({ where: { uid_cliente } })
        res.json(listaVehiculos)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Erro al obtener la lista de vehiculos de un cliente'
        })
    }
}

module.exports = { vehiculos_get_cliente, vehiculos_post }