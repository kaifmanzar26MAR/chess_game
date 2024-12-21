import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../connections/socket.io.js";

const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const receiver = req.user.opponent._id;
  const { message } = req.body;

  //*Validating all the required variables...
  if (!sender) {
    throw new ApiError("Sender not found!!");
  }
  if (!receiver) {
    throw new ApiError("Reciever not found!!");
  }
  if (!message || message.trim() === "") {
    throw new ApiError("Message not found!!");
  }

  //*Creating message
  const messageInstance = await Message.create({
    message: message,
    sender: sender,
  });
  if (!messageInstance) {
    throw new ApiError("Something went worng in creation of message!!");
  }

  //*Adding Message in Conversation if no conversation then create
  let conversation = await Conversation.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ],
  });

  if (!conversation) {
    conversation = await Conversation.create({
      sender: sender,
      receiver: receiver,
    });

    if (!conversation) {
      throw new ApiError("Something went wrong in creating the conversation!!");
    }
  }

  conversation.messageIds.push(messageInstance._id);

  await conversation.save();

  const receiverSocketId = getReceiverSocketId(receiver);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", {
        message: message,
        sender: sender,
      });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { conversation },
        "Message saved saved successfully!!"
      )
    );
});

const getMessages = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const receiver = req.user.opponent._id;

  //*Validating sender and receiver
  if (!sender) {
    throw new ApiError("Sender not found!!");
  }
  if (!receiver) {
    throw new ApiError("Reciever not found!!");
  }

  //*Getting the conversiation
  let conversation = await Conversation.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ],
  }).populate("messageIds");

  if (!conversation) {
    const messages = [];
    return res
      .status(200)
      .json(new ApiResponse(200, { messages }, "No Conversation Found!!"));
  }

  const all_message_ids = conversation.messageIds;
  const all_message = await Message.find({ _id: { $in: all_message_ids } });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { all_message }, "Conversation got Successfully!!")
    );
});

export { sendMessage, getMessages };
