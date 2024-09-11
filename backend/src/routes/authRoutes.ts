import express from "express";
import { getUserById, login, register } from "../controllers/auth";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUserById);

export default router;
