const {Router}=require('express')
const { auth_login } = require('../controllers/auth.controller')

const router = Router()

router.post('/login',auth_login)

module.exports=router