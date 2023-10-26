import { Router } from "express";
import Products  from "../dao/dbManagers/products.js";

const router = Router();
const productManager = new Products();

router.get('/',async(req,res)=>{
    let products = await productManager.getAll();
    res.render('realTimeProducts',{listProducts:products})
})



export default router;