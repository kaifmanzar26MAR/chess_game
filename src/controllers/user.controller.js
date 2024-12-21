import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../connections/socket.io.js";
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
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generteRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// const refreshAccessToken = asyncHandler(async (req, res) => {
//     const incomingRefreshToken =
//       req.cookies.refreshToken || req.body.refreshToken;

//     if (!incomingRefreshToken) {
//       throw new ApiError(401, "unauthorized request");
//     }

//     try {
//       const decodedToken = jwt.verify(
//         incomingRefreshToken,
//         process.env.REFRESH_TOKEN_SECRET
//       );

//       const user = await User.findById(decodedToken?._id);

//       if (!user) {
//         throw new ApiError(401, "Invalid refresh Token");
//       }
//       if (incomingRefreshToken !== user?.refreshToken) {
//         throw new ApiError(401, "Refresh Token is expired or used");
//       }

//       const options = {
//         httpOnly: true,
//         secure: true,
//       };
//       const { accessToken, newRefreshToken } =
//         await generateAccessAndRefreshTokens(user._id);

//       return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", newRefreshToken, options)
//         .json(
//           new ApiResponse(
//             200,
//             { accessToken, refreshToken: newRefreshToken },
//             "Access Token Refreshed"
//           )
//         );
//     } catch (error) {
//       throw new ApiError(401, error?.message || "Invalid refresh token");
//     }
//   });

const loginAndUserMapping = asyncHandler(async (req, res) => {
  try {
    let { username } = req.params;

    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({
        username: username.toLowerCase(),
      });
      if (!user) {
        throw new ApiError(
          500,
          "Something Went wrong while registering the user"
        );
      }
    }

    //check for the the unpaired
    let unpaired_user = await User.findOne({
      _id: { $ne: user._id },
      opponent: { $exists: false },
    });

    if (unpaired_user) {
      //mapping user
      user.opponent = unpaired_user._id;
      unpaired_user.opponent = user._id;
      //setting turn
      user.turn = unpaired_user._id;
      unpaired_user.turn = unpaired_user._id;
      //setting color
      unpaired_user.color = "white";
      user.color = "black"; 
      //mapping the basic borser 
      let string_board = default_board;
      unpaired_user.board = string_board;
      user.board = string_board; 

      await Promise.all([user.save(), unpaired_user.save()]);
      const receiverSocketId = getReceiverSocketId(unpaired_user._id);
    
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("updatedUser");
      }
    }

    io.emit("login", user._id);



    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const loggedInUser = await User.findById(user._id)
      .populate("opponent")
      .select("-refreshToken");
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error));
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "current user fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  if(req.user.opponent){
    const receiverSocketId = getReceiverSocketId(req.user.opponent._id);
    await User.findByIdAndUpdate(req.user.opponent._id,
      {
        $unset:{
          opponent: 1,
          color:1,
          turn:1,
        },
        $set:{
          board: default_board,
        }
      }
    );
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("updatedUser");
    }
  }
  

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const setTurn = asyncHandler(async (req, res) => {
  const {board} = req.body;
  const user1 = req.user;
  if (!user1.opponent) {
    throw new ApiError("No Opponent Found");
  }
  const user2 = await User.findOne({ _id: user1.opponent._id });

  const next_trun = user2._id;

  user1.turn = next_trun;
  user2.turn = next_trun;

  user1.board = board;
  user2.board = board;

  await Promise.all([user1.save(), user2.save()]);

  const receiverSocketId = getReceiverSocketId(user1.opponent._id);
  
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("updatedUser");
    }

  return res.status(200).json(new ApiResponse(201, "Turn updated"));
});

const game_over_message = asyncHandler(async (req, res)=>{
  const userId = req.user._id;
  const opponentId = req.user?.opponent._id;
  if(!userId || !opponentId){
    throw new ApiError("No user or Opponent!");
  }
  const {message, board} = req.body;

  if(!message){
    throw new ApiError("No Game over message found!!");
  }

  //*resetting the board
  const user1 = req.user;
  const user2 = await User.findOne({ _id: opponentId });

  const next_trun = user2._id;

  user1.turn = next_trun;
  user2.turn = next_trun;

  user1.board = board;
  user2.board = board;

  await Promise.all([user1.save(), user2.save()]);


  const receiverSocketId = getReceiverSocketId(opponentId);
  const senderSocketId = getReceiverSocketId(userId);
  
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("game_over_message", message.losser_message);
  }
  if(userId){
    io.to(senderSocketId).emit("game_over_message", message.winner_message);
  }

  return res.status(201).json(new ApiResponse(200, message, "message sent to opponete"));

})

export { loginAndUserMapping, currentUser, logoutUser, setTurn, game_over_message };

// const getUserById = asyncHandler(async (req, res) => {
//   console.log("func arrive");
//   const { user_id } = req.body;
//   console.log(user_id);

//   if ([user_id].some((field) => field.trim() === "")) {
//     throw new ApiError(500, "Provided id is not in proper format!");
//   }
//   console.log("reached here");

//   const user = await User.findOne({ _id: user_id }).select(
//     "-password -refreshToken"
//   );

//   if (!user) {
//     throw new ApiError(500, "Enter a valid User ID");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, user, "Got the user Successfully"));
// });
