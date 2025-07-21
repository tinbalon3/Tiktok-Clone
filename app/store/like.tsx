import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { Like, Post, PostWithProfile } from "../types";

import useGetPostById from "../hooks/useGetPostById";
import useGetAllPosts from "../hooks/useGetAllPosts";
import useGetPostByUser from "../hooks/useGetPostByUser";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";

interface LikeStore {
   likesByPost: Like[];
   setLikesByPost: (postId: string) => void;
}

export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            (set) => ({
                // initial state
                likesByPost: [],
                
                // actions
                setLikesByPost: async (postId: string) => {
                    const result = await useGetLikesByPostId(postId);
                    set({ likesByPost: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)