import mongoose from "mongoose";

const usersCollection = 'users'
const userSchema = mongoose.Schema({

    first_name: {
        type: String,
        required : true
    },
    last_name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    age:{ 
        type: Number
    },
    cart:{
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "carts"
            }
        ],
        default: null
    },
    role : {
        type: String,
        default: 'user',
        enum: ['user', 'admin','owner']
    }
})

const userModel =  mongoose.model(usersCollection, userSchema)
export default userModel;