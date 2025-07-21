

const useCreateBucketUrl = (fileId: string) => {
    try {
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
        const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

        if (!endpoint || !bucketId || !projectId) {
            return ''
        }

        const url = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
        return url;
    } catch (error) {
        throw error;
    }
}

export default useCreateBucketUrl;