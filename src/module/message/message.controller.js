import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";

import { messageValidate } from "./message.validate.js";
import { validateInput } from "../../common/utils/validate.js";
import {
  deleteMessage,
  getAllMessages,
  getAllMessagesById,
  sendMessage,
} from "./message.service.js";
import { upload } from "../../common/middleware/multer.js";

let router = Router();
router.post("/send-message", validateInput(messageValidate),upload().array('images',5), sendMessage);
router.get("/message", auth, getAllMessages);
router.get("/message-by-id/:id", auth, getAllMessagesById);
router.delete("/message/:id", auth, deleteMessage);

export default router;
