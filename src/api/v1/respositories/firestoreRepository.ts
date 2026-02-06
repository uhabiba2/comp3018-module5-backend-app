import { db } from "../../../../config/firebaseConfig";
import { FirestoreDataTypes } from "../types/firestore";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

/**
 * Updates an existing document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to update.
 * @param {Partial<T>} data - The updated document data.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs during document update.
 */
export const updateDocument = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

// ... other repository functions (getDocumentById, createDocument, deleteDocument) ...