const Taller = require("../models/taller.model")
const Persona = require("../models/persona.model")

const esEmailValido= async(correo_electronico='')=>{
    const existeEmailTaller = await Taller.findOne({correo_electronico})
    const existeEmailPersona = await Persona.findOne({correo_electronico})
  
    
    if(existeEmailTaller || existeEmailPersona){
        throw new Error(`el siguiente email: ${correo_electronico} , ya esta registrado en la BD`)
    }
    
}

module.exports={esEmailValido}