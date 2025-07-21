import { database } from "@/libs/AppWriteClient";

const useUpdateProfileImage = async (user_id: string, image: string) => {
    try {
        console.log("user_id", user_id)
        console.log("image", image)
        await database.updateDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            user_id,
            {
                image: image
            }
        );
    } catch (error) {
        throw error;
    }
}

export default useUpdateProfileImage;