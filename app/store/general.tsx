import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { RandomUsers } from "../types";
import useGetRandomUsers from "../hooks/useGetRandomUsers";
interface GeneralState {
    isLoginOpen: boolean;
    isEditProfileOpen: boolean;
    randomUsers: RandomUsers[];
    setIsLoginOpen: (isLoginOpen: boolean) => void;
    setIsEditProfileOpen: (isEditProfileOpen: boolean) => void;
    setRandomUsers: (randomUsers: RandomUsers[]) => void;
}

export const useGeneralStore = create<GeneralState>()(
    devtools(
        persist(
            (set) => ({
                isLoginOpen: false,
                isEditProfileOpen: false,
                randomUsers: [],
                setIsLoginOpen: (isLoginOpen: boolean) => set({ isLoginOpen }),
                setIsEditProfileOpen: (isEditProfileOpen: boolean) => set({ isEditProfileOpen }),
                setRandomUsers: async () => {
                    const result = await useGetRandomUsers();
                    set({ randomUsers: result });
                }
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)