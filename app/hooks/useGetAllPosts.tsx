import { database, Query } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "./userGetProfileByUserId";

const useGetAllPosts = async () => {
    try {
        const postsResult = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            [Query.orderDesc("$id")]
        )
        const posts = postsResult.documents;
        const objPromises = posts.map(async (document) => {
            const profile = await useGetProfileByUserId(document.user_id);
         
            return {
                id: document.$id,
                user_id: document.user_id,
                video_url: document.video_url,
                text: document.text,
                created_at: document.created_at,
                profile: {
                    user_id: profile?.user_id,
                    name: profile?.name,
                    image: profile?.image,
                }
            }
        });
        const result = await Promise.all(objPromises);
        console.log("result",result)    
        return result;
    } catch (error) {
        throw error;
    }
}

export default useGetAllPosts;