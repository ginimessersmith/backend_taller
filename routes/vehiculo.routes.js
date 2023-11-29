const { Router } = require('express')

const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')
const { vehiculos_post, vehiculos_get_cliente } = require('../controllers/vehiculo.controlle')


const router = Router()

router.get('/:uid_cliente',[validarJWT,validarCampos],vehiculos_get_cliente )
router.post('/crear_vehiculo',vehiculos_post)

module.exports = router