import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const userRouter: Router = express.Router();



// API Doc 1: GET endpoint with User Information by ID 
/**
 * @openapi
 * /users/:id:
 *   get:
 *     summary: Retrieve a single user information filtering by user ID
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user, developer]
 *         description: find the user by id
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
// Only admins can view detailed user information
userRouter.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    getUserDetails
);

export default userRouter;