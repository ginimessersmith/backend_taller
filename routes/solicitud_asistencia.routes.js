const { Router } = require('express')

const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { solicitad_asistencia_get, solicitud_Asistencia_post, servicio_img_post, servicio_post, aceptar_Solicitud_taller } = require('../controllers/solicitud_asistencia.controller')


const router = Router()

router.get('/', [validarJWT,validarCampos], solicitad_asistencia_get)
router.post('/',[], solicitud_Asistencia_post)
router.post('/asignar_img_asistencia',[], servicio_img_post)
router.post('/crear_servicio',[], servicio_post)
router.post('/asignar_taller_solicitud',[],aceptar_Solicitud_taller )
module.exports = router