const jwt = require('jsonwebtoken')
const Taller = require('../models/taller.model')


const validarJWT = async (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            mensaje: 'Usuario no autorizado, no hay token en la peticion'
        })
    }

    try {
        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const tallerAutenticado = await Taller.findOne({ where: { uid: uuid } })


        if (!tallerAutenticado) {
            return res.status(401).json({
                mensaje: 'El usuario no existe en la base de datos'
            })
        }

        if (tallerAutenticado) {
            req.usuarioAutenticado = tallerAutenticado
        }
        
        console.log('request: ', req.usuarioAutenticado)
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            mensaje: 'Usuario no autorizado, token no valido'
        })
    }
}

module.exports = { validarJWT }