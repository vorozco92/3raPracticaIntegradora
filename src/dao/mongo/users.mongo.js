import userModel from "../../models/schemas/users.schema.js";
export class Users{
    constructor(){
        console.log("Trabajando con Mongo")
    }
    // get
    get=async(param)=>{
        let users =await userModel.find(param).populate('cart');
        return users.map(user=>user.toObject())
    }
    //create 
    save=async(user)=>{
        let result =await userModel.create(user);
        return result;
    }
    //getBy
    getById= async(param)=>{
        let result =await userModel.findOne(param).populate('cart').lean();
        return result
    }
    update =async(id,user)=>{
        delete user._id
        let result=await userModel.updateOne({_id:id},{$set:user})
        return result
    }

}