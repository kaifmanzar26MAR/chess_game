import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const router = Router();
router.route("/get_message").post(userAuth, getMessages);
router.route("/send_messaage").post(userAuth, sendMessage);



export default router;