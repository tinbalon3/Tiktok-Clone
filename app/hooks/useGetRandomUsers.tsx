import { database, ID, Query } from "@/libs/AppWriteClient";

const useGetRandomUsers = async () => {
    try {
        const profileResult = await database.listDocuments(

            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            [Query.limit(5)]
        );

        const profileDocuments = profileResult.documents;

        const result = profileDocuments.map((profile) => ({
            id: profile?.$id,
            name: profile?.name,
            image: profile?.image,
        }));

        return result;
    } catch (error) {
        throw error;
    }
}

export default useGetRandomUsers;