import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { Post, PostWithProfile } from "../types";

import useGetPostById from "../hooks/useGetPostById";
import useGetAllPosts from "../hooks/useGetAllPosts";
import useGetPostByUser from "../hooks/useGetPostByUser";

interface PostStore {
   allPosts: PostWithProfile[] ;
   postsByUser: Post[];
   postById: PostWithProfile | null;
   setAllPosts: () => void;
   setPostsByUser: (userId: string) => void;
   setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
    devtools(
        persist(
            (set) => ({
                // initial state
                allPosts: [],
                postsByUser: [],
                postById: null,
                
                // actions
                setAllPosts: async () =>
                    {
                        const result = await useGetAllPosts();
                        set({ allPosts: result });
                    },
                setPostsByUser: async (userId: string) => {
                    const result = await useGetPostByUser(userId);
                    set({ postsByUser: result });
                },
                setPostById: async (postId: string) => {
                    const result = await useGetPostById(postId);
                    set({ postById: result });
                },
                
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)