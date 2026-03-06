import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validation/postSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const postRouter = express.Router();

// create new post with authentication and role-based authorization
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