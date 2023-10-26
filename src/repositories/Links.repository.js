import getDAOS from "../dao/factory.js";
import LinkDTO from "../dto/Link.dto.js";

const { linksDAO } = getDAOS();

export class LinksRepository{

    constructor(){
        this.dao= linksDAO;
    }

    async getAllLinks(){
        return await this.dao.get();
    }

    async saveLink(payload){
        const productPayload =  LinkDTO.getLinkInputFrom(payload)
        return await this.dao.save(productPayload)
    }

    async getLinkById(param){
        let result = await this.dao.find(param).lean();
        return result
    }


}