import mongoose from "mongoose";
import mongoosePaginate from "mongoose-aggregate-paginate-v2";

const productsCollection = 'products'
const productSchema = mongoose.Schema({

    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    code:{
        type: String,
        required : true
    },
    price:{
        type: Number,
        required : true
    },
    status:{
        type: Boolean,
        default: true,
        required : true
    },
    stock:{
        type: Number,
        required : true
    },
    category:{
        type: String,
        required : true
    },
    thumbnails: {
        type: Array,
        default: []
    },
    owner:{
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
            }
        ],
        default: null
    } 
})

productSchema.plugin(mongoosePaginate);
const productsModel =  mongoose.model(productsCollection, productSchema)
export default productsModel;