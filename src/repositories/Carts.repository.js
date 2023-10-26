import getDAOS from "../dao/factory.js";
import CartDTO from "../dto/Cart.dto.js";

const { cartsDAO } = getDAOS();

export class CartsRepository{

    constructor(){
        this.dao = cartsDAO;
    }

    async getAllCarts(){
        return await this.dao.get();
    }

    async saveCart(payload){
        const cartPayload =  CartDTO.getCartInputFrom(payload)
        return await this.dao.save(cartPayload)
    }

    async getCartById(param){
        let result = await this.dao.getCartById(param);
        return result
    }

    async updateCart(id,user){
        delete user._id
        let result = await this.dao.updateOne({_id:id},{$set:user})
        return result
    }

}