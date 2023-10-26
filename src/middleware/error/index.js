import EError from "../../services/errors/enum.js";

export default (error,req,res,next)=>{
    console.log( "Intento "+error.code);
    switch(error.code){
        case EError.INVALID_TYPES_ERROR:
            console.log("pase por aqui de nuevo")
            res.send({status: " Error ", error: error.name})
            break
        default:
            res.send({status:"Error", error: " Error desconocido"})
    }

}