const { Router } = require('express')

const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { solicitad_asistencia_get, solicitud_Asistencia_post, servicio_img_post, servicio_post, asignar_servicio, asignar_Solicitud_taller, asignar_Solicitud_tecnico, mostrar_solictudes_tecnico, mostrar_tecnicos_solicitudes, ver_servicios } = require('../controllers/solicitud_asistencia.controller')


const router = Router()

router.get('/', [], solicitad_asistencia_get)
router.get('/ver_solicitudes_tecnico/:uid_tecnico', [], mostrar_solictudes_tecnico)
router.get('/ver_tecnicos_pertenecen_solicitud/:uid_solicitud_asistencia', [], mostrar_tecnicos_solicitudes)
router.post('/', [], solicitud_Asistencia_post)
router.post('/asignar_img_asistencia', [], servicio_img_post)
router.post('/crear_servicio', [], servicio_post)
router.post('/asignar_taller_solicitud', [], asignar_Solicitud_taller)
router.post('/asignar_servicio', [], asignar_servicio)
router.post('/aceptar_taller', [], asignar_Solicitud_taller)
router.post('/asignar_tecnico_solicitud', [], asignar_Solicitud_tecnico)
router.get('/ver_servicios', [],ver_servicios)


module.exports = router