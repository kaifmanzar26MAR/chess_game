import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    }
});

const User = mongoose.models.user || mongoose.model('User', userSchema);

export default User;