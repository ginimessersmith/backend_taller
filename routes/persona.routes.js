const { Router } = require('express')
const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { persona_post_cliente, persona_post_tecnico, persona_get_clientes, persona_get_tecnicos, actualizar_ubicacion_tecnico, obtener_ubicacion } = require('../controllers/persona.controller')
const router = Router()

router.get('/ver_tecnicos',[validarJWT,validarCampos],persona_get_tecnicos)
router.get('/ver_clientes',[validarJWT,validarCampos],persona_get_clientes)
router.post('/crear_cliente',persona_post_cliente)
router.post('/crear_tecnico',persona_post_tecnico)
router.put('/actualizar_ubicacion_tecnico',actualizar_ubicacion_tecnico)
router.get('/ver_ubicacion_tecnico/:uid_tecnico',obtener_ubicacion)

module.exports = router