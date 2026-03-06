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

        res.status(HTTP_STATUS.CREATED).json(successResponse({newPost}, "Post created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles GET request to read all posts
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


// handles GET request to read a single post by ID
export const getPostByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const post = await postService.getPostById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({post}, "Post retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles PUT request to update an existing post
export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const {userId, content} = req.body;
        const updateData = {userId, content};

        const updatedPost = await postService.updatePost(id as string, updateData);

        res.status(HTTP_STATUS.OK).json(successResponse({updatedPost}, "Post updated successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles DELETE request to delete an existing post
export const deletePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        
        await postService.deletePost(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({}, "Post deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};