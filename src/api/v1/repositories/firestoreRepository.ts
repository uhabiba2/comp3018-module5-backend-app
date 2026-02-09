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

// to get all documents in a collection
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

// to get a single document by ID
export const getDocById = async <T>(collectionName: string, docId: string): Promise<T | null> => {
    try {

        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(docId);

        /// get() function only reads data from docRef pointer
        const snapshot = await docRef.get();

        if(!snapshot)
            return null;

        return {
            id: snapshot.id,
            ...(snapshot.data() as T),
        };
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// to get a single document by ID
export const updateDocument = async <T>(collectionName: string, 
    docId: string,
    data: Partial<T>
): Promise<void> => {
    try {

        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(docId);

        await docRef.update(data);
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// ... other repository functions (getDocumentById, createDocument, deleteDocument) ...