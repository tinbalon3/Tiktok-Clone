import { database, Query } from "@/libs/AppWriteClient";

const useGetProfileByUserId = async (userId: string) => {
    try {
        const profile = await database.listDocuments(
         
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            [Query.equal("user_id", userId)]
        );
        const documents = profile.documents;

        if(documents.length === 0){
            return null;
        }
        return {
            id: documents[0].$id,
            user_id: documents[0].user_id,
            name: documents[0].name,
            bio: documents[0].bio,
            image: documents[0].image,
        }
       
    } catch (error) {
        throw error;
    }
}

export default useGetProfileByUserId;