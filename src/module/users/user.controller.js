import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import {
  edit,
  profile,
  deleteUser,
  profileURL,
  getUserData,
} from "./user.service.js";
import { editValidate } from "./user.validate.js";
import { validateInput } from "../../common/utils/validate.js";

let router = Router();

router.get("/profile", auth, profile);
router.put("/edit", auth, validateInput(editValidate), edit);
router.delete("/delete", auth, deleteUser);
router.get("/profile-url", auth, profileURL);
router.get("/get-user-data-from-user-name", getUserData);
export default router;
