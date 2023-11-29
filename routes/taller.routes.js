const { Router } = require('express')
const { taller_get, taller_post } = require('../controllers/taller.controller')
const { validarJWT } = require('../middleware/validarJWT')
const { validarCampos } = require('../middleware/validarCampos')


const router = Router()

router.get('/', [validarJWT,validarCampos], taller_get)
router.post('/',[], taller_post)

module.exports = router