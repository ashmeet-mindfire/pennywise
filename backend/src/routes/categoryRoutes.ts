import { addCategory, getCategories } from "../controllers/category";
import express from "express";
const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);

export default router;
