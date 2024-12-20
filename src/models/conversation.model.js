import mongoose, {Schema} from "mongoose";

const conversationSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    messageIds:[
        {
            type: Schema.Types.ObjectId,
            reg: "Messaage"
        }
    ]
},{
    timestamps:true,
});

export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);