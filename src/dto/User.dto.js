export default class UserDTO {
    static getUserInputFrom = (user) =>{
        return {
            first_name : user.first_name,
            last_name: user.last_name,
            email : user.email,
            password : user.password,
            age: user.age   || 18,
            cart: user.cart || null,
            role: user.role || 'user'
        }
    }

    static getUserInputFromClean = (user) =>{
        return {
            first_name : user.first_name,
            last_name: user.last_name,
            email : user.email,
            role: user.role
        }
    }
}