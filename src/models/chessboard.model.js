import mongoose, { Schema } from "mongoose";

const chessBoardSchema = new Schema({
    board: {
        type: Object,
        required: true,
    },
    userid1:{
        type: Schema.Types.ObjectId,
        required:true
    },
    userid2:{
        type:Schema.Types.ObjectId,
        required:true
    }
}, {
    timestamps: true,
});

const chessBoard = mongoose.models.chessBoard || mongoose.model('chessBoard', chessBoardSchema);

export {chessBoard};
