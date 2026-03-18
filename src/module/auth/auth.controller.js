import { Router } from "express";
import { login, signup, generateNewAccessToken, verifyEmail, resendOTP, forgetPassword, resetPassword } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { loginValidate, signupValidate, verifyValidate } from "./auth.validate.js";
import { validateInput } from "../../common/utils/validate.js";
import { upload } from "../../common/middleware/multer.js";

let router = Router();

router.post("/signup", validateInput(signupValidate),upload().single('image'), signup);
router.post("/login", validateInput(loginValidate), login);
router.post("/generate-new-access-token", auth, generateNewAccessToken);
router.put("/verify-email", validateInput(verifyValidate), verifyEmail);
router.post('/resend-otp',resendOTP);
router.put('/forget-password',forgetPassword);
router.put("/reset-password", resetPassword);
export default router;
