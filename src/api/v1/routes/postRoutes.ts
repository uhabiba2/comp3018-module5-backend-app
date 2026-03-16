import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validations/postSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const postRouter = express.Router();

// create new post with authentication and role-based authorization
// API Doc 2: create new POST endpoint with request body
/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *             properties:
*               userId:
*                   type: string
*                   description: The user ID
*                   example: "user123"
*               content:
*                   type: string
*                   description: The content of the post
*                   example: "test content"
*               createdAt:
*                   type: string
*                   format: date-time
*                   description: The date and time when the item was created
*                   example: "2024-01-15T10:30:00Z"
*               updatedAt:
*                   type: string
*                   format: date-time
*                   description: The date and time when the item was last updated
*                   example: "2024-01-20T14:45:00Z"
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
postRouter.post("/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }), 
    validateRequest(postSchemas.create),
    postController.createPostHandler);


postRouter.get("/", authenticate, postController.getAllPostsHandler);
postRouter.get("/:id", authenticate, validateRequest(postSchemas.getById), postController.getPostByIdHandler);


postRouter.put("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }), 
    validateRequest(postSchemas.update), postController.updatePostHandler);

postRouter.delete("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest(postSchemas.delete), postController.deletePostHandler);



export default postRouter;