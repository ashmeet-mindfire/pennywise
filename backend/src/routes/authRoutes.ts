import express from "express";
import { getUserById, login, register } from "../controllers/auth";
const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       name: user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           description: User Details
 *     description: Create a new user
 *     responses:
 *       200:
 *         description:
 */
router.post("/register", register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       name: user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           description: User Details
 *     description: Login user
 *     responses:
 *       200:
 *         description:
 */
router.post("/login", login);

/**
 * @openapi
 * /api/v1/auth/user:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id whose transactions need to be fetched
 *     description: Returns user details
 *     responses:
 *       200:
 *         description: User details fetched successfully
 */
router.get("/user", getUserById);

export default router;
