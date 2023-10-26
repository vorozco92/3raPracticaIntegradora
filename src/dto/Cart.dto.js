export default class CartDTO {
    static getCartInputFrom = (cart) =>{
        return {
            products : cart.products || []
        }
    }
}