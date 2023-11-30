const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})



const Persona = require("../models/persona.model");
const Servicio = require('../models/servicio.models');
const Servicio_img = require("../models/servicio_img.model");
const Servicio_Solicitudes = require('../models/servicios_solicitudes.model');
const Solicitud_Asistencia = require("../models/solicitad_asistencia.model");
const Taller = require("../models/taller.model");
const Tecnico_Solicitud = require('../models/tecnico_asistencia.model');
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
        const listaSolicitudesAsistencia = await Solicitud_Asistencia.findAll({
            where: {
                uid_taller: null, estado: false
            }
        })
        const filtrarFotos = []

        for (let solicitud of listaSolicitudesAsistencia) {
            const listaServicios = await Servicio_Solicitudes.findAll({
                where: { uid_solicitud_asistencia: solicitud.uid }
            })
            const filtrarServicios = []
            for (let servicio of listaServicios) {
                const { uid_servicio } = servicio
                const unServicio = await Servicio.findByPk(uid_servicio)
                console.log('SERVICOOOOOOOOOOOOOOOO: ', unServicio)
                const json = {
                    descripcion: unServicio.descripcion,

                }

                filtrarServicios.push(json)
            }

            const listaFotos = await Servicio_img.findAll({
                where: { uid_solicitud_asistencia: solicitud.uid }
            })
            const { uid_vehiculo } = solicitud
            const unVehiculo = await Vehiculo.findByPk(uid_vehiculo)
            const { uid_cliente } = unVehiculo
            const unCliente = await Persona.findByPk(uid_cliente)
            const response = {
                uid_solicitud: solicitud.uid,
                fecha_solicitud: solicitud.fecha,
                hora_solicitud: solicitud.hora,
                latitud_solicitud: solicitud.latitud,
                longitud: solicitud.longitud,
                cliente: unCliente,
                vehiculo: unVehiculo,
                listaServicios: filtrarServicios,
                listaFotos
            }
            filtrarFotos.push(response)
        }

        res.json(filtrarFotos)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al obtener todas las solicitudes de asistencia'
        })
    }
}
const mostrar_solictudes_tecnico = async (req, res) => {
    try {
        const { uid_tecnico } = req.params
        const listaSolicitudesTecnico = await Tecnico_Solicitud.findAll({ where: { uid_tecnico } })
        const lista = []
        for (let solicitud of listaSolicitudesTecnico) {
            const { uid_tecnico, uid_solicitud_asistencia } = solicitud
            const tecnico_persona = await Persona.findByPk(uid_tecnico)

            const solicitud_asistencia = await Solicitud_Asistencia.findByPk(uid_solicitud_asistencia)

            const json = {
                solicitud_asistencia
            }
            lista.push(json)
        }
        res.json(lista)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al obtener todas las solicitudes de asistencia'
        })
    }
}

const mostrar_tecnicos_solicitudes = async (req, res) => {
    const { uid_solicitud_asistencia } = req.params
    try {
        const listaTecnico = await Tecnico_Solicitud.findAll({ where: { uid_solicitud_asistencia } })
        const tecnicos = []
        for (let tecnico of listaTecnico) {
            const { uid_tecnico } = tecnico
            const unTecnico = await Persona.findByPk(uid_tecnico)
            tecnicos.push(unTecnico)
        }
        res.json(tecnicos)
    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al obtener los tecnicos' })
    }
}

const asignar_Solicitud_taller = async (req, res) => {
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

const asignar_servicio = async (req, res) => {
    const { uid_servicio, uid_solicitud_asistencia } = req.body
    try {
        const unServicio = await Servicio.findByPk(uid_servicio)
        const unaSolicitud = await Solicitud_Asistencia.findByPk(uid_solicitud_asistencia)
        if (unServicio && unaSolicitud) {
            const servicio_solicitud = await Servicio_Solicitudes.create({
                uid_servicio,
                uid_solicitud_asistencia
            })
            return res.json(servicio_solicitud)
        } else {
            return res.status(400).json({
                mensaje: 'Error debe de venir un servicio y una solicitud'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al asignar un servicio a una solicitud'
        })
    }

}

const concluir_servicio_tecnico = async (req, res) => {
    const { uid_tecnico, uid_solicitud } = req.body
    try {
        const unTecnico = await Persona.findOne({
            where: {
                uid: uid_tecnico,
                tipo_persona: 'tecnico'
            }
        })
        const unaSolicitud = await Solicitud_Asistencia.findByPk(uid_solicitud)

        if (unTecnico && unaSolicitud) {
            unaSolicitud.estado = true
            await unaSolicitud.save()
            return res.json(unaSolicitud)
        } else {
            return res.status(400).json({
                mensaje: 'Error debe de venir un tecnico y una solicitud'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al asignar un servicio a una solicitud'
        })
    }
}

const asignar_Solicitud_tecnico = async (req, res) => {
    const { uid_tecnico, uid_solicitud_asistencia } = req.body

    try {
        const unTecnico = await Persona.findByPk(uid_tecnico)
        const unaSolicitud = await Solicitud_Asistencia.findByPk(uid_solicitud_asistencia)
        if (unTecnico && unaSolicitud && unTecnico.tipo_persona == 'tecnico') {
            const nueva_tecnico_solicitud = await Tecnico_Solicitud.create({
                uid_tecnico,
                uid_solicitud_asistencia
            })
            return res.json({ nueva_tecnico_solicitud })
        } else {
            return res.status(400).json({
                mensaje: 'debe venir un tecnico o una solicitud en la request, o bien el usuario persona no es tipo_persona = tecnico'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al asignar un tecnico a la solicitud'
        })
    }
}


module.exports = {
    solicitad_asistencia_get,
    solicitud_Asistencia_post,
    servicio_img_post,
    servicio_post,
    asignar_Solicitud_taller,
    asignar_servicio,
    concluir_servicio_tecnico,
    asignar_Solicitud_tecnico,
    mostrar_solictudes_tecnico,
    mostrar_tecnicos_solicitudes
}