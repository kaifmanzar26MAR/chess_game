import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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

let mapUserData = {};
const loginAndUserMapping = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);

    const user = await User.findOne({ username });

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
    const unpaired_user = await User.findOne({
      _id: { $ne: user._id },
      opponent: { $exists: false }
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


      await Promise.all([user.save(), unpaired_user.save()]);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const loggedInUser = await User.findById(user._id).populate("opponent").select("-refreshToken");
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
    console.log(error);
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
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
        opponent: 1,
      },
    },
    {
      new: true,
    }
  );

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

const setTurn = asyncHandler(async(req, res)=>{
  const user1 = req.user;
  if(!user1.opponent){
    throw new ApiError("No Opponent Found");
  }
  const user2 = await User.findOne({_id:user1.opponent._id});
  
  const current_trun = user1?.turn;

  const next_trun = current_trun === user1._id ? user2._id : user1._id;

  user1.turn = next_trun;
  user2.turn = next_trun;

  await Promise.all([user1.save(), user2.save()]);

  return res.status(200).json(new ApiResponse(201, "Turn updated"));
})

export { loginAndUserMapping, currentUser, logoutUser, setTurn };

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
