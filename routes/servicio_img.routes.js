const { Router } = require('express')

const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { servicio_img_get, servicio_img_post } = require('../controllers/servicio_img.controller')


const router = Router()

router.get('/', [validarJWT,validarCampos], servicio_img_get)
router.post('/:uid_solicitud_asistencia',[], servicio_img_post)

module.exports = router