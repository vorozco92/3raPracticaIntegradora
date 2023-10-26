export default class ProductDTO {
    static getProductInputFrom = (product) =>{
        return {
            title: product.title,
            description: product.description,
            code : product.code,
            price : product.price,
            status: product.status,
            stock : product.stock,
            category : product.category,
            thumbnails: product.thumbnails || [] 
        }
    }
}