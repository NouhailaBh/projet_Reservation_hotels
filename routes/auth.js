import express  from "express";
import { login, register } from "../controllers/auth.js";
import { loginHost, registerHost ,forgotPasswordHost,changePassword,changePasswordUser,NewPassword} from "../controllers/auth.js";

const router=express.Router();


router.post("/register",register);
router.post("/login",login);
router.post("/forgotPasswordHost", forgotPasswordHost);

router.post('/:id/change-password', changePassword);
router.post('/:id/newPassword', NewPassword);
router.post('/:id/password', changePasswordUser);
router.post("/registerHost",registerHost);
router.post("/loginHost",loginHost);

export default router
