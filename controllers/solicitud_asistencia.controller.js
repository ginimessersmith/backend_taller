const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})



const Persona = require("../models/persona.model");
const Servicio = require('../models/servicio.models');
const Servicio_img = require("../models/servicio_img.model");
const Solicitud_Asistencia = require("../models/solicitad_asistencia.model");
const Taller = require("../models/taller.model");
const Vehiculo = require("../models/vehiculos.model");

const solicitud_Asistencia_post = async (req, res) => {
    const {
        fecha,
        hora,
        latitud,
        longitud,
        uid_taller,
        uid_cliente,
        uid_vehiculo,
    } = req.body

    try {

        const unTaller = await Taller.findByPk(uid_taller)
        const unCliente = await Persona.findByPk(uid_cliente)
        const unVehiculo = await Vehiculo.findByPk(uid_vehiculo)

        if (!unTaller && unCliente && unVehiculo) {
            if (latitud && longitud) {
                const nuevaSolicitudAsistencia = await Solicitud_Asistencia.create({
                    fecha,
                    hora,
                    latitud,
                    longitud,
                    uid_cliente,
                    uid_vehiculo,
                })
                res.json(nuevaSolicitudAsistencia)
            } else {
                const nuevaSolicitudAsistencia = await Solicitud_Asistencia.create({
                    fecha,
                    hora,
                    uid_taller,
                    uid_cliente,
                    uid_vehiculo,
                })
                res.json(nuevaSolicitudAsistencia)
            }

        } else {
            return res.status(400).json({
                mensaje: 'no se puede solicitar una asistencia ya que falta algunos de estos datos: Taller, Cliente o Vehiculo'
            })
        }



    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Erro al crear una solicitud asistencia' })
    }
}

const servicio_img_post = async (req, res) => {
    try {
        const { uid_solicitud_asistencia } = req.body
        const unaSoliAsis = await Solicitud_Asistencia.findByPk(uid_solicitud_asistencia)
        if (unaSoliAsis) {
            if (req.files && Object.keys(req.files).length !== 0 && req.files.archivo) {

                const { tempFilePath } = req.files.archivo
                const cloud = await cloudinary.uploader.upload(tempFilePath, { folder: 'taller' })
                const { secure_url } = cloud

                const nuevaServicioImg = await Servicio_img.create({
                    img_url: secure_url,
                    uid_solicitud_asistencia
                })
                return res.json(nuevaServicioImg)
            } else {
                const nuevaServicioImg = await Servicio_img.create({
                    uid_solicitud_asistencia
                })
                return res.json(nuevaServicioImg)
            }
        } else {
            return res.status(400).json({
                mensaje: 'No se encontro la Solicitud Asistencia para la asignacion'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear un servicio_img'
        })
    }
}

const servicio_post = async (req, res) => {
    try {
        const { descripcion } = req.body
        if (descripcion) {
            const nuevoServicio = await Servicio.create({
                descripcion
            })
            return res.json(nuevoServicio)
        } else {
            return res.json({ mensaje: 'Debe venir una descripcion del servicio' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear un servicio'
        })
    }

}

const solicitad_asistencia_get = async (req, res) => {
    try {
        const listaSolicitudesAsistencia = await Solicitud_Asistencia.findAll({ where: { uid_taller: null } })
        res.json(listaSolicitudesAsistencia)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al obtener todas las solicitudes de asistencia'
        })
    }
}

const aceptar_Solicitud_taller = async (req, res) => {
    const { uid_taller, uid_solicitud_asistencia } = req.body

    try {
        const unTaller = await Taller.findByPk(uid_taller)
        const unaSolicitud = await Solicitud_Asistencia.findByPk(uid_solicitud_asistencia)
        if (unTaller && unaSolicitud) {
            unaSolicitud.uid_taller = uid_taller
            await unaSolicitud.save()
            return res.json(unaSolicitud)

        } else {
            return res.status(400).json({
                mensaje: 'debe venir un taller o una solicitud en la request'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al asignar un taller a la solicitud'
        })
    }
}

module.exports = {
    solicitad_asistencia_get,
    solicitud_Asistencia_post,
    servicio_img_post,
    servicio_post,
    aceptar_Solicitud_taller
}