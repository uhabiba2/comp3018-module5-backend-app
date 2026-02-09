import { Request, Response, NextFunction } from "express";
import * as postService from "../services/postService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new post
export const createPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {userId, content} = req.body;
        const postData = {userId, content};

        const newPost = await postService.createPost(postData);

        res.status(HTTP_STATUS.OK).json(successResponse({newPost}, "Post created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles POST request to create new post
export const getAllPostsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();

        res.status(HTTP_STATUS.OK).json(successResponse({posts}, "Posts retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};
