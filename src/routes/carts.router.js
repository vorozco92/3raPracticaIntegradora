import { Router } from "express"
import { CartsRepository } from "../repositories/Carts.repository.js";
import { ProductsRepository } from "../repositories/Products.repository.js";
import { TicketsRepository } from "../repositories/Tickets.repository.js";
import applyPolicy from '../middleware/auth.middleware.js';
import customError from '../services/errors/customError.js'
import EError from '../services/errors/enum.js'
import { generateCartError } from '../services/errors/info.js'

const router = Router();
const cartsRepository = new CartsRepository()
const productsRepository = new ProductsRepository()
const ticketsRepository = new TicketsRepository()


router.get('/',async(req,res)=>{
    let carts = await cartsRepository.getAllCarts();
    res.send({status:'success',carts:carts})
})

router.post('/', applyPolicy(['USER']),async(req,res)=>{
    const {products, user} = req.body;
    let cart = {};
    cart.user = user;
    
    if (products)
        cart.products = products

    let result =await cartsRepository.saveCart(cart)
    res.send({status:'success',cart:result})
})

router.get('/:id', async(req, res)=>{
    let cartId = req.params.id;
    let cart = await cartsRepository.getCartByIdPopulate(cartId);
    if (cart)
        res.render('carts',{status:'success',products:cart.products})
    else
        res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})
})

router.put('/:id', async(req, res)=>{
    let cartId = req.params.id;
    let cart = await cartsRepository.getCartById(cartId);
    if (cart){
        let cartBody = req.body;
        let cartEdit = await cartsRepository.updateCartById(cartId, cartBody);
        res.send({status:'success',cart:cartEdit})
    }
    else{
        customError.createError({
            name: " Error al agregar el producto",
            cause: generateCartError(),
            message:" Fallo al agregar el producto",
            code: EError.INVALID_TYPES_ERROR
        })
    }
        //res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})
})

router.delete('/:cid/products/:pid', async(req, res)=>{
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let cart = await cartsRepository.getCartById(cartId);
    if (cart){
        let cartEdit = await cartsRepository.deleteProductInCartById(cartId, productId);
        res.send({status:'success', cart: cartEdit});
    }
    else
        res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})
})

router.put('/:cid/products/:pid', async(req, res)=>{
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let {qty} = req.body;
    let cart = await cartsRepository.getCartById(cartId);
    if (cart){
        let cartEdit = await cartsRepository.updateProductInCartById(cartId, productId, qty);
        res.send({status:'success', cart: cartEdit});
    }
    else
        res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})
})

router.delete('/:cid', async(req, res)=>{
    let cartId = req.params.cid;
    let cart = await cartsRepository.getCartById(cartId);
    if (cart){
        let cartR = await cartsRepository.deleteProductsInCart(cartId);
        res.send({status:'success', cart: cartR});
    }
    else
        res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})
})

router.post('/:cid/purchase', async(req, res)=>{
    let cartId = req.params.cid;
    let cart = await cartsRepository.getCartByIdPopulate(cartId);
    if (!cart)    
        res.send({status:'error','error_description':`carrito con Id ${cartId} no fue encontrado.`})

    if (! cart.products)
        res.send({status:'error','error_description':`carrito no contiene productos.`})

    let stockDeficit, productsNotExists = [];
    let totalAmount = 0;
    cart.products.forEach(product => {
        let productStorage = productsRepository.getProductById(product._id);

        if (productStorage){
            if (productStorage.quanity < product.qty)
                stockDeficit.push(product._id)
            else{
                productStorage.quanity = productStorage.quanity - product.qty;
                totalAmount += ( product.qty * productStorage.price);
            }
        }
        else
            productsNotExists.push(product._id);

    });

    if (! totalAmount)
        res.send({status:'error','error_description':`carrito no contiene productos.`})

    let uID = Math.random(10000);
    let newTicket = {
        code: uID.padStart((12 - uID.length), '0'),
        amount : totalAmount,
        purcharser: req.session.email,

    }

    let ticketResult = await ticketsRepository.saveTicket(newTicket);
    
    res.render('carts',{status:'success',ticket: ticketResult})
       
})

export default router;