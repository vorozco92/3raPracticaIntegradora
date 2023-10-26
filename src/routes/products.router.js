import { Router } from "express"
import { ProductsRepository } from "../repositories/Products.repository.js";
import applyPolicy from '../middleware/auth.middleware.js';
import passport from "passport";
import customError from '../services/errors/customError.js'
import EError from '../services/errors/enum.js'
import { generateProductError } from '../services/errors/info.js'

const router = Router();
const productsRepository = new ProductsRepository()


//router.use(passport.authenticate('api/sessions/current',{session:false}))

router.get('/',async(req,res)=>{

    if (! req.session.user)
        res.redirect('/login')

    let limit = req.query.limit ?? 10;
    let page = req.query.page ?? 1;
    let sort = req.query.sort ?? 'asc';
    let body = req.body ?? {};
    console.log(body);
    sort =  sort.toLowerCase();
    let products = await productsRepository.getAllProducts(limit, page, sort, body);
    req.logger.debug(`Products ${products} at ${req.url} - ${new Date().toLocaleTimeString()}`);

    if (products.docs && ! products.docs.length)
       res.send({status:'error', error:'No se obtuvieron resultados de productos'})
    else
        res.render('products',{status:'success',
            payload:products.docs,
            totalPages:products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage,
            prevLink: products.hasPrevPage ? req.protocol+'://'+req.get('host')+ req.baseUrl + '?sort='+sort+'&limit='+limit+'&page='+products.prevPage : null ,
            nextLink: products.hasNextPage ? req.protocol+'://'+req.get('host')+ req.baseUrl + '?sort='+sort+'&limit='+limit+'&page='+products.nextPage : null,
            user: req.session.user
        })
})

router.post('/',async(req,res)=>{
    const {title, description, code, price, stock, category} = req.body;

    let newProduct = {
        title: title,
        description: description,
        code : code,
        price : price,
        stock : stock,
        category : category
    }

    if (! title || ! description || ! code || ! price || ! stock || ! category){
        customError.createError({
            name: " Error al crear el producto",
            cause: generateProductError(newProduct),
            message:" Fallo el intento de crear el producto",
            code: EError.INVALID_TYPES_ERROR
        })
    }

    if (req.body.thumbnails)
        newProduct.thumbnails = req.body.thumbnails

    if (req.body.status)
        newProduct.status = req.body.status

    let result = await productsRepository.saveProduct(newProduct)
    req.app.io.sockets.emit('update_data', {id:result.id,product:result})
    res.send({status:'success',product:result})
})

router.get('/:id', async(req, res)=>{
    let productId = req.params.id;
    let product = await productsRepository.getProductById(productId);
    if (product.id)
        res.send({status:'success',product:product})
    else
        res.send({status:'error','error_description':`producto con Id ${productId} no fue encontrado.`})
})

router.put('/:id', applyPolicy(['ADMIN']), async(req, res)=>{
    let productId = req.params.id;
    req.logger.debug(` productId: ${productId} at ${req.url} - ${new Date().toLocaleTimeString()}`);
    let product = await productsRepository.getProductById(productId);
    if (product){
        let productBody = req.body;
        let productEdit = await productsRepository.updateProductById(productId, productBody);
        res.send({status:'success',product:productEdit})
    }
    else
        res.send({status:'error','error_description':`producto con Id ${productId} no fue encontrado.`})
})

router.delete('/:pid', applyPolicy(['ADMIN']), (req, res)=>{
    let pid = req.params.pid;
    if(productsRepository.deleteProductById(pid)){
        req.app.io.sockets.emit('delete_product', pid)
        req.logger.debug(`Producto eliminado: ${pid} at ${req.url} - ${new Date().toLocaleTimeString()}`);
        res.send({status:"success", message :"Producto eliminado correctamente"});
    }
    else
        res.send({status:"error", message :"No fue posible eliminar el producto"});
});
export default router;