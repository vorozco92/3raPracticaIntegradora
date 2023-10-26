import { MessagesDAO } from "./messages/messages.dao.js";
import { CartsDAO } from "./carts/carts.dao.js"
import {ProductsDAO} from "./products/products.dao.js";
import { UsersDAO } from "./users/users.dao.js";

const userDao = new UsersDAO();
const messagesDao = new MessagesDAO();
const cartsDao = new CartsDAO();
const productsDao = new ProductsDAO();

export const getDAOS  =()=>{
    userDao,
    cartsDao,
    messagesDao,
    productsDao
}
