const { Router } = require('express')
const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { persona_get, persona_post, persona_post_cliente, persona_post_tecnico, persona_get_clientes, persona_get_tecnicos } = require('../controllers/persona.controller')
const router = Router()

router.get('/ver_tecnicos',[validarJWT,validarCampos],persona_get_tecnicos)
router.get('/ver_clientes',[validarJWT,validarCampos],persona_get_clientes)
router.post('/crear_cliente',persona_post_cliente)
router.post('/crear_tecnico',persona_post_tecnico)

module.exports = router