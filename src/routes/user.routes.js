import { Router } from "express";
import { currentUser, loginAndUserMapping, setTurn } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const router = Router();
router.route("/login/:username").get(loginAndUserMapping);

router.route("/get_current_user").get(userAuth, currentUser);
router.route("/update_user_trun").get(userAuth, setTurn);

export default router;