const Servicio_img = require("../models/servicio_img.model")
const Solicitud_Asistencia = require("../models/solicitad_asistencia.model")



const servicio_img_get =async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje:'Error al obtener un servicio_img'
        })
    }
}

module.exports={
    servicio_img_get,
    servicio_img_post
}

