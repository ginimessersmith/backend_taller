const bcrypt = require('bcryptjs')
const { generar_jwt } = require('../helpers/generar_jwt')
const Taller = require('../models/taller.model')
const Persona = require('../models/persona.model')

const auth_login = async (req, res) => {
    const { correo, password_user } = req.body
    try {
        const unTaller = await Taller.findOne({where:{correo}})
        const unaPersona= await Persona.findOne({where:{correo}})
        
        if (unTaller) {    
            const validarPassword = bcrypt.compareSync(password_user, unTaller.password_user)
            if (!validarPassword) {
                return res.status(400).json({
                    mensaje: 'la contraseña  es incorrecta'
                })
            }

            const token = await generar_jwt(unTaller.uid)
            const taller = await Taller.findOne({ where: { correo },attributes:['uid','nombre','direccion','correo','telefono','latitud','longitud'] })
            return res.json({
                taller,
                token
            })
        }else{
            if (unaPersona) {
                const validarPassword = bcrypt.compareSync(password_user, unaPersona.password_user)
                if (!validarPassword) {
                    return res.status(400).json({
                        mensaje: 'la contraseña  es incorrecta'
                    })
                }
    
                const token = await generar_jwt(unaPersona.uid)
                const persona = await Persona.findOne({ where: { correo },attributes:['uid','nombre','correo','telefono','latitud','longitud','tipo_persona'] })
                return res.json({
                    persona,
                    token
                })
                
            } else {
                return res.status(400).json({
                   mensaje: 'el correo no existe'
                })
            }
        }

        

    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'error al realizar el login'
        })
    }
}

module.exports = { auth_login }