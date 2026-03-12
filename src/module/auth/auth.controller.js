import { Router } from "express";
import { login, signup, generateNewAccessToken } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { loginValidate, signupValidate } from "./auth.validate.js";
import { validateInput } from "../../common/utils/validate.js";
import { upload } from "../../common/middleware/multer.js";

let router = Router();

router.post("/signup", validateInput(signupValidate),upload().single('image'), signup);
router.post("/login", validateInput(loginValidate), login);
router.post("/generate-new-access-token", auth, generateNewAccessToken);

export default router;
