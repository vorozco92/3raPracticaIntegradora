import cartsModel from "../../models/schemas/carts.schema.js";

export default class Carts{

    constructor(){
        console.log("Estamos trabajando en db mongo");
    }

    getAll=async()=>{
        let courses = await cartsModel.find().lean();
        return courses
    }

    saveCart = async cart=> {
        let result = await cartsModel.create(cart)
        return result
    }
}