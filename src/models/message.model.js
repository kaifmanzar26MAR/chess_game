import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
},{
    timestamps:true,
});

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);