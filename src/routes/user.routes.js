import { Router } from "express";
import { currentUser, loginAndUserMapping, logoutUser, setTurn, game_over_message } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const router = Router();
router.route("/login/:username").get(loginAndUserMapping);

router.route("/get_current_user").get(userAuth, currentUser);
router.route("/update_user_trun").post(userAuth, setTurn);
router.route("/game_over").post(userAuth, game_over_message);
router.route("/logout").get(userAuth, logoutUser);

export default router;