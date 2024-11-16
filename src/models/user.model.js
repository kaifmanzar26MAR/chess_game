import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const pieceSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  color: { type: String, default: "" },
  background: { type: String, default: "" },
  icon: { type: String, default: "" },
});


const default_board = [
  [
    {
      name: "Rook",
      color: "black",
      background: "",
      icon: "./black/icons/rook_black.png",
    },
    {
      name: "Knight",
      color: "black",
      background: "",
      icon: "./black/icons/knight_black.png",
    },
    {
      name: "Bishop",
      color: "black",
      background: "",
      icon: "./black/icons/bishop_black.png",
    },
    {
      name: "Queen",
      color: "black",
      background: "",
      icon: "./black/icons/queen_black.png",
    },
    {
      name: "King",
      color: "black",
      background: "",
      icon: "./black/icons/king_black.png",
    },
    {
      name: "Bishop",
      color: "black",
      background: "",
      icon: "./black/icons/bishop_black.png",
    },
    {
      name: "Knight",
      color: "black",
      background: "",
      icon: "./black/icons/knight_black.png",
    },
    {
      name: "Rook",
      color: "black",
      background: "",
      icon: "./black/icons/rook_black.png",
    },
  ],
  Array(8).fill({
    name: "Pawn",
    color: "black",
    background: "",
    icon: "./black/icons/pawn_black.png",
  }),
  Array(8).fill({ name: "", color: "", background: "", icon: "" }), // Empty rows
  Array(8).fill({ name: "", color: "", background: "", icon: "" }),
  Array(8).fill({ name: "", color: "", background: "", icon: "" }),
  Array(8).fill({ name: "", color: "", background: "", icon: "" }),
  Array(8).fill({
    name: "Pawn",
    color: "white",
    background: "",
    icon: "./white/icons/pawn_red.png",
  }),
  [
    {
      name: "Rook",
      color: "white",
      background: "",
      icon: "./white/icons/rook_red.png",
    },
    {
      name: "Knight",
      color: "white",
      background: "",
      icon: "./white/icons/knight_red.png",
    },
    {
      name: "Bishop",
      color: "white",
      background: "",
      icon: "./white/icons/bishop_red.png",
    },
    {
      name: "King",
      color: "white",
      background: "",
      icon: "./white/icons/king_red.png",
    },
    {
      name: "Queen",
      color: "white",
      background: "",
      icon: "./white/icons/queen_red.png",
    },
    {
      name: "Bishop",
      color: "white",
      background: "",
      icon: "./white/icons/bishop_red.png",
    },
    {
      name: "Knight",
      color: "white",
      background: "",
      icon: "./white/icons/knight_red.png",
    },
    {
      name: "Rook",
      color: "white",
      background: "",
      icon: "./white/icons/rook_red.png",
    },
  ],
];

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  opponent:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  turn:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  color:{
    type:String,
  },
  board:{
    type: [[pieceSchema]], 
    default: default_board,
    required: true,
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      opponent:this.opponent,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generteRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.models.user || mongoose.model("User", userSchema);

export { User };
