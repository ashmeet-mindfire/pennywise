import { addCategory, getCategories, getExpensesByCategory } from "../controllers/category";
import express from "express";
const router = express.Router();

/**
 * @openapi
 * /api/v1/category:
 *   get:
 *     tags:
 *       - Category
 *     description: Returns a list of categories!
 *     responses:
 *       200:
 *         description: Returns a list of categories.
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/v1/category:
 *   post:
 *     tags:
 *       - Category
 *     parameters:
 *       - in: body
 *         name: category
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *         description: Category Details
 *     description: Create a new category
 *     responses:
 *       200:
 *         description: Category created successfully
 */
router.post("/", addCategory);

/**
 * @openapi
 * /api/v1/category/category-expenses:
 *   get:
 *     tags:
 *       - Category
 *     description: Returns a list of categories and their expenses
 *     responses:
 *       200:
 *         description: Categories and their expenses fetched successfully
 */
router.get("/category-expenses", getExpensesByCategory);

export default router;
