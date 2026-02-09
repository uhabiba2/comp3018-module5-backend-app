import { Post } from "../models/postModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { postSchemas } from "../validation/postSchemas";
import { validateRequest } from "../middleware/validate";

const COLLECTION = "posts";

// creating new post 
export const createPost = async (postData: {userId: string, content: string}): Promise<Post> => {
    try {
        const newPostData = {
            ... postData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const id = await firestoreRepository.createDocument<Post>(COLLECTION, newPostData);

        return {id, ... newPostData} as Post;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create post: ${errorMessage}`
        );
    }
};

// creating new post 
export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const posts = await firestoreRepository.getAllDocuments<Post>(COLLECTION);

        return posts;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all posts: ${errorMessage}`
        );
    }
};



// ... other service functions (getPostById, updatePost, deletePost) ...