import linkModel from "../../models/schemas/links.schema.js";
export class Links{
    constructor(){
        console.log("Trabajando con Mongo")
    }
    // get
    get=async(param)=>{
        let link =await linkModel.find(param).populate('user');
        return link.map(user=>user.toObject())
    }
    //create 
    save=async(link)=>{
        let result =await linkModel.create(link);
        return result;
    }
    //getBy
    getById= async(param)=>{
        let result =await linkModel.find(param).populate('user').lean();
        return result
    }


}