import getDAOS from "../dao/factory.js";
import UserDTO from "../dto/User.dto.js";

const { usersDAO } = getDAOS();

export class UsersRepository{

    constructor(){
        this.dao= usersDAO;
    }

    async getAllUsers(){
        return await this.dao.get();
    }

    async saveUser(payload){
        const userPayload =  UserDTO.getUserInputFrom(payload)
        return await this.dao.save(userPayload)
    }

    async getUserById(param){
        let result =await this.dao.getById(param);
        return result
    }

    async updateUser(id,user){
        delete user._id
        let result = await this.dao.updateOne({_id:id},{$set:user})
        return result
    }

}