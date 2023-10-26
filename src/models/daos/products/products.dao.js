import productsModel from "../models/products.js";

export default class Products{

    constructor(){
        console.log("Estamos trabajando en db mongo");
    }

    getAll=async(limit, page, sort, query )=>{
        limit = parseInt(limit); 
        const skip = (Number(page) - 1) * limit;

        var aggregate = productsModel.aggregate([        
            {
                $sort: { price : sort == 'desc' ? -1 : 1 }
            },
            {
                $match: query ?? {},
            }           
        ]);
        let products = await productsModel.aggregatePaginate(aggregate,{limit:limit,page:page})/*aggregate([        
            {
                $sort: { price : sort == 'desc' ? -1 : 1 }
            },
            {
                $match: query ?? {},
            }           
        ]);*/

        return products;
    }

    saveProducts = async product=> {
        let result = await productsModel.create(product)
        return result
    }

    getIdProduct = async() =>{
        let endProd = await productsModel.findOne().sort([['_id', 'desc']]);
        if (endProd)
            return endProd.id+1;
        return 1;
    }

    getProductById = async(id) =>{
        let product = await productsModel.findOne({'_id': id});
        return product;
    }

    updateProductById = async(id, product)=> {
        let result = await productsModel.findOneAndUpdate({_id:id},product)
        return result
    }

    deleteProductById = (id)=> {
        let result = productsModel.findOneAndDelete({_id:id})
        return result
    }
}