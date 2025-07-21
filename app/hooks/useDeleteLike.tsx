import { database, ID, storage } from "@/libs/AppWriteClient";

const useDeleteLike = async (likeId: string) => {
   
    try {
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
            likeId
        )
    } catch (error) {
        throw error;
    }
}

export default useDeleteLike;