import mongoose from "mongoose";

const messagesCollection = 'messages'
const messageSchema = mongoose.Schema({
    user:{
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
            }
        ],
        default: null
    },
    message:{
        type: String,
        required : true
    },
    date_send:{
        type: Date,
        default: new Date()
    }
})

const messagesModel =  mongoose.model(messagesCollection, messageSchema)
export default messagesModel;