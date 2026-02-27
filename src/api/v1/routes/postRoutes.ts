import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validation/postSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// create new post with authentication and role-based authorization
router.post("/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }), 
    validateRequest(postSchemas.create),
    postController.createPostHandler);


router.get("/", authenticate, postController.getAllPostsHandler);
router.get("/:id", authenticate, validateRequest(postSchemas.getById), postController.getPostByIdHandler);


router.put("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }), 
    validateRequest(postSchemas.update), postController.updatePostHandler);

router.delete("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest(postSchemas.delete), postController.deletePostHandler);



export default router;