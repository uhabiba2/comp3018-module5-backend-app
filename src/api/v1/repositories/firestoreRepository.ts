import { db } from "../../../../config/firebaseConfig";
import { FirestoreDataTypes } from "../types/firestore";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

// create new document
export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).add(data);

        // returns document id for the new post created in the firestore
        return docRef.id;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

export const getAllDocuments = async <T>(collectionName: string): Promise<T[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();

        // returns document id for the new post created in the firestore
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ... (doc.data() as T)
        }))
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// ... other repository functions (getDocumentById, createDocument, deleteDocument) ...