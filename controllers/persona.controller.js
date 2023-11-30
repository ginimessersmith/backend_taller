const bcrypt = require('bcryptjs')
const Persona = require("../models/persona.model")



const persona_post_cliente = async (req, res) => {
    const {
        nombre,
        correo,
        password_user,
        confirm_password,
        telefono,
        latitud,
        longitud,
        disponibilidad_tecnico,

        uid_taller
    } = req.body
    try {
        const tipo_persona = 'cliente'
        if (password_user == confirm_password) {
            const emailPersona = await Persona.findOne({ where: { correo } })
            if (emailPersona) {
                return res.status(404).json({
                    mensaje: 'el correo electronico ya existe'
                })
            }
            const salt = bcrypt.genSaltSync()
            const encryptPassword = bcrypt.hashSync(password_user, salt)
            if (latitud != undefined && longitud != undefined && uid_taller != undefined) {
                const nuevaPersona = await Persona.create({
                    nombre,
                    correo,
                    password_user: encryptPassword,
                    telefono,
                    latitud,
                    longitud,
                    disponibilidad_tecnico,
                    tipo_persona,
                    uid_taller
                })
                const personaData = await Persona.findOne({
                    where: { uid: nuevaPersona.uid }, attributes: [
                        'uid',
                        'disponibilidad_tecnico',
                        'nombre',
                        'correo',
                        'telefono',
                        'tipo_persona',
                        'latitud',
                        'longitud',
                        'uid_taller',]
                })
                return res.json(personaData)
            } else {

                if (uid_taller != undefined && uid_taller != '') {
                    const nuevaPersona = await Persona.create({
                        nombre,
                        correo,
                        password_user: encryptPassword,
                        telefono,
                        disponibilidad_tecnico,
                        tipo_persona,
                        uid_taller
                    })
                    const personaData = await Persona.findOne({
                        where: { uid: nuevaPersona.uid }, attributes: [
                            'uid',
                            'disponibilidad_tecnico',
                            'nombre',
                            'correo',
                            'telefono',
                            'tipo_persona',
                            'latitud',
                            'longitud',
                            'uid_taller',]
                    })
                    return res.json(personaData)

                } else {
                    const nuevaPersona = await Persona.create({
                        nombre,
                        correo,
                        password_user: encryptPassword,
                        telefono,
                        disponibilidad_tecnico,
                        tipo_persona,

                    })
                    const personaData = await Persona.findOne({
                        where: { uid: nuevaPersona.uid }, attributes: [
                            'uid',
                            'disponibilidad_tecnico',
                            'nombre',
                            'correo',
                            'telefono',
                            'tipo_persona',
                            'latitud',
                            'longitud',
                            'uid_taller',]
                    })
                    return res.json(personaData)
                }

            }
        } else {
            return res.status(404).json({
                mensaje: 'las contraseñas no son iguales'
            })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear una persona'
        })
    }
}

const persona_post_tecnico = async (req, res) => {
    const {
        nombre,
        correo,
        password_user,
        confirm_password,
        telefono,
        latitud,
        longitud,
        disponibilidad_tecnico,

        uid_taller
    } = req.body
    try {
        const tipo_persona = 'tecnico'
        if (password_user == confirm_password) {
            const emailPersona = await Persona.findOne({ where: { correo } })
            if (emailPersona) {
                return res.status(404).json({
                    mensaje: 'el correo electronico ya existe'
                })
            }
            const salt = bcrypt.genSaltSync()
            const encryptPassword = bcrypt.hashSync(password_user, salt)
            if (latitud != undefined && longitud != undefined && uid_taller != undefined) {
                const nuevaPersona = await Persona.create({
                    nombre,
                    correo,
                    password_user: encryptPassword,
                    telefono,
                    latitud,
                    longitud,
                    disponibilidad_tecnico,
                    tipo_persona,
                    uid_taller
                })
                const personaData = await Persona.findOne({
                    where: { uid: nuevaPersona.uid }, attributes: [
                        'uid',
                        'disponibilidad_tecnico',
                        'nombre',
                        'correo',
                        'telefono',
                        'tipo_persona',
                        'latitud',
                        'longitud',
                        'uid_taller',]
                })
                return res.json(personaData)
            } else {

                if (uid_taller != undefined && uid_taller != '') {
                    const nuevaPersona = await Persona.create({
                        nombre,
                        correo,
                        password_user: encryptPassword,
                        telefono,
                        disponibilidad_tecnico,
                        tipo_persona,
                        uid_taller
                    })
                    const personaData = await Persona.findOne({
                        where: { uid: nuevaPersona.uid }, attributes: [
                            'uid',
                            'disponibilidad_tecnico',
                            'nombre',
                            'correo',
                            'telefono',
                            'tipo_persona',
                            'latitud',
                            'longitud',
                            'uid_taller',]
                    })
                    return res.json(personaData)

                } else {
                    const nuevaPersona = await Persona.create({
                        nombre,
                        correo,
                        password_user: encryptPassword,
                        telefono,
                        disponibilidad_tecnico,
                        tipo_persona,

                    })
                    const personaData = await Persona.findOne({
                        where: { uid: nuevaPersona.uid }, attributes: [
                            'uid',
                            'disponibilidad_tecnico',
                            'nombre',
                            'correo',
                            'telefono',
                            'tipo_persona',
                            'latitud',
                            'longitud',
                            'uid_taller',]
                    })
                    return res.json(personaData)
                }

            }
        } else {
            return res.status(404).json({
                mensaje: 'las contraseñas no son iguales'
            })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al crear una persona'
        })
    }
}

const persona_get_clientes = async (req, res) => {

    try {
        const listaClientes = await Persona.findAll({
            where: {
                tipo_persona: 'cliente'
            }
        })
        res.json(listaClientes)

    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al obtener todos los tecnicos' })
    }
}
const persona_get_tecnicos = async (req, res) => {

    try {
        const listaTecnicos = await Persona.findAll({
            where: {
                disponibilidad_tecnico: true,
                tipo_persona: 'tecnico'
            }
        })
        res.json(listaTecnicos)

    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al obtener todos los tecnicos' })
    }

}

const actualizar_ubicacion_tecnico = async (req, res) => {
    const { uid_tecnico, latitud, longitud } = req.body
    try {
        const unTecnico = await Persona.findByPk(uid_tecnico)
        if (unTecnico && unTecnico.tipo_persona == 'tecnico') {
            if (latitud != undefined && longitud != undefined) {
                unTecnico.latitud = latitud
                unTecnico.longitud = longitud
                await unTecnico.save()
                res.json(unTecnico)
            } else {
                return res.status(404).json({
                    mensaje: 'la latitud y longitud debe venir en la request'
                })
            }

        } else {
            return res.status(404).json({
                mensaje: 'el tecnico no existe o no tiene el rol de tecnico'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al actualizar la ubicacion del tecnico' })
    }

}

const obtener_ubicacion = async (req, res) => {
    const { uid_tecnico } = req.params
    try {
        const tecnico = await Persona.findByPk(uid_tecnico)
        if (tecnico) {
            const {latitud,longitud}=tecnico
            res.json({
                latitud,
                longitud
            })
        } else {
            return res.status(404).json({
                mensaje: 'error, el tecnico no existe o el usuario no tiene rol de tecnico'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al obtener la ubicacion del tecnico' })
    }

}
module.exports = {
    persona_post_cliente,
    persona_post_tecnico,
    persona_get_clientes,
    persona_get_tecnicos,
    actualizar_ubicacion_tecnico,
    obtener_ubicacion
}
