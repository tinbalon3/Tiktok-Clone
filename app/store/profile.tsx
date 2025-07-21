import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { Profile } from "../types";

import useGetProfileByUserId from "../hooks/userGetProfileByUserId";

interface ProfileStore {
   currentProfile: Profile | null;
   setCurrentProfile: (userId: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
    devtools(
        persist(
            (set) => ({
                currentProfile: null,
                setCurrentProfile: async (userId: string) => {
                    const profile = await useGetProfileByUserId(userId);
                    set({ currentProfile: profile });
                }
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)