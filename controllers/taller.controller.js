const { where } = require("sequelize")
const Taller = require("../models/taller.model")
const bcrypt = require('bcryptjs')




const taller_post = async (req, res) => {
    try {
        const { nombre,
            direccion,
            correo,
            password_user,
            confirm_password,
            telefono,
            latitud,
            longitud } = req.body
        if (password_user == confirm_password) {
            const emailTaller = await Taller.findOne({ where: { correo } })
            if(emailTaller){
                return res.status(400).json({
                    mensaje: 'el correo ya existe '
                })
            }
            const salt = bcrypt.genSaltSync()
            const encryptPassword = bcrypt.hashSync(password_user, salt)

            if (latitud != undefined && longitud != undefined) {
                const nuevoTaller = await Taller.create({
                    nombre,
                    direccion,
                    correo,
                    password_user: encryptPassword,
                    telefono,
                    latitud,
                    longitud
                })
                return res.json(nuevoTaller)
            } else {
                const nuevoTaller = await Taller.create({
                    nombre,
                    direccion,
                    correo,
                    password_user: encryptPassword,
                    telefono,

                })
                const taller = await Taller.findOne({ where: { uid: nuevoTaller.uid }, attributes: ['uid', 'nombre', 'direccion', 'correo', 'telefono', 'latitud', 'longitud'] })
                return res.json(taller)
            }

        } else {
            return res.status(400).json({
                mensaje: 'las contraseñas no son iguales'
            })
        }


        //res.json(nuevoTaller)
    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Error al crear un taller' })
    }
}

const taller_get = async (req, res) => {
    try {
        const listaTalleres = await Taller.findAll()
        res.json(listaTalleres)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'Error al obtener los talleres'
        })
    }
}
module.exports = {
    taller_post,
    taller_get
}