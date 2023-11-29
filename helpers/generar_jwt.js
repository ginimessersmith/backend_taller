const jwt = require('jsonwebtoken')

const generar_jwt =(uuid='')=>{

    return new Promise((resolve,reject)=>{
        const payload= {uuid}
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'24h'},
        (err,token)=>{
            if(err){
                console.log('Error al generar el token:',err)
                reject('no se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {generar_jwt}