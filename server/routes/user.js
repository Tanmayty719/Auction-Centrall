import express from 'express';
import { handleGetUser, handleChangePassword, getLoginHistory ,uploadProfilePhoto} from '../controllers/user.controller.js';
import upload from "../middleware/multer.js";


const userRouter = express.Router();

userRouter.get('/', handleGetUser);
userRouter.patch("/", handleChangePassword);
userRouter.get("/logins", getLoginHistory)
userRouter.post(
  "/upload-avatar",
  
  upload.single("avatar"),
  uploadProfilePhoto
);
export default userRouter;