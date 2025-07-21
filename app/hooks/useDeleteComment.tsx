import { database, ID, storage } from "@/libs/AppWriteClient";

const useDeleteComment = async (commentId: string) => {
   
    try {
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT),
            commentId
        )
    } catch (error) {
        throw error;
    }
}

export default useDeleteComment;