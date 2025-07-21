import { database, Query } from "@/libs/AppWriteClient";


const useGetPostByUser = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            [Query.equal("user_id", userId),
                Query.orderDesc("$id")
            ]
        )

        const documents = response.documents;
        const result = documents.map((document) => {
            return {
                id: document.$id,
                user_id: document.user_id,
                video_url: document.video_url,
                text: document.text,
                created_at: document.created_at,
            }
        })

        return result;

    } catch (error) {
        throw error;
    }
}

export default useGetPostByUser;