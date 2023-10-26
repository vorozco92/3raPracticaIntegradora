import mongoose from "mongoose";

const messagesCollection = 'links'
const messageSchema = mongoose.Schema({
    user:{
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
            }
        ],
        default: null
    },
    codelink:{
        type: String,
        required : true
    },
    date_send:{
        type: Datetime,
        default: new Datetime()
    }
})

const messagesModel =  mongoose.model(messagesCollection, messageSchema)
export default messagesModel;