const express=require('express')
const cors=require('cors')
const fileupload=require('express-fileupload')
const paths=require('../paths/path')
const { sequelize } = require('../database/db_connection')


class Server{
    constructor(){
        this.app = express(),
        this.port=8084
        //?
        this.db_connection()
        this.middleware()
        this.router()

    }

    async db_connection(){
        try {
            await sequelize.authenticate()
            console.log('conexion a la base de datos con exito')
        } catch (error) {
            console.log('error en la conexion a la base de datos')
            console.log(error)
        }
    }

    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(fileupload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`server corriendo en el puerto: ${this.port}`)
        })
    }
    router(){
        this.app.use(paths.auth,require('../routes/auth.routes'))
        this.app.use(paths.taller,require('../routes/taller.routes'))
        this.app.use(paths.persona,require('../routes/persona.routes'))
    }
}

module.exports=Server