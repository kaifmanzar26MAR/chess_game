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
    message:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

export const Conveersation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);