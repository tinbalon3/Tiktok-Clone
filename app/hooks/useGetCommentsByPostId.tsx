import { database, Query } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "./userGetProfileByUserId";

const useGetCommentsByPostId = async (postId: string) => {

    try {
        const commentsResult = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT),
            [
                Query.equal("post_id", postId),
                Query.orderDesc("$id")
            ]
        )
       const objPromises = commentsResult.documents.map(async (comment) => {
        const profile = await useGetProfileByUserId(comment.user_id);
        return {
            id: comment.$id,
            user_id: comment.user_id,
            post_id: comment.post_id,
            text: comment.text,
            created_at: comment.created_at,
            profile: {
                user_id: profile?.user_id,
                name: profile?.name,
                image: profile?.image,
            }
        }
       });
       const comments = await Promise.all(objPromises);
       return comments;
    } catch (error) {
        throw error;
    }
}

export default useGetCommentsByPostId;