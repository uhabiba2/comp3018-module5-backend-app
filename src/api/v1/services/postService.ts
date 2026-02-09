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

// creating new post 
export const getPostById = async (id: string): Promise<Post> => {
    try {
        const post = await firestoreRepository.getDocById<Post>(COLLECTION, id);

        if(!post){
            throw new Error("Post not found");
        }

        return post;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the post: ${errorMessage}`
        );
    }
};


// updating a post 
export const updatePost = async (id: string, 
    postData:{userId: string, content: string
}): Promise<Post | null> => {
    try {
        const updatePostData: Partial<Post> = {};
        
        if(postData.userId != undefined) {
            updatePostData.userId = postData.userId;
        }

        if(postData.content != undefined) {
            updatePostData.content = postData.content;
        }

        if(Object.keys(updatePostData).length === 0){
            throw new Error("no fields provied to updated");
        }        
        
        updatePostData.updatedAt = new Date(); 

        await firestoreRepository.updateDocument(COLLECTION, id, updatePostData);

        const updatedPost = await firestoreRepository.getDocById<Post>(COLLECTION, id);

        if(!updatedPost){
            throw new Error("Updated post not found");
        }

        return updatedPost;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update the post: ${errorMessage}`
        );
    }
};



// ... other service functions (getPostById, updatePost, deletePost) ...