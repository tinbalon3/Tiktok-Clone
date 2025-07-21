import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { account, ID } from "@/libs/AppWriteClient";
import { useRouter } from "next/navigation";
import { User } from "../types";
import useGetProfileByUserId from "../hooks/userGetProfileByUserId";
import useCreateProfile from "../hooks/useCreateProfile";

interface UserState {
    user: User | null;
    router: any;
    checkUser: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                router: null,
                setRouter: (router: any) => set({ router }),
                checkUser: async () => {
                    try {
                        const currentSession = await account.getSession("current");
                        if (!currentSession) {
                            return;
                        }
                        const userData = await account.get() as any;
                        const profile = await useGetProfileByUserId(userData.$id);
                        set({
                            user: {
                                id: userData.$id,
                                name: profile?.name,
                                bio: profile?.bio,
                                image: profile?.image,
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                },

                register: async (name: string, email: string, password: string) => {
                    try {
                        const userData = await account.create(ID.unique(), email, password, name);
                        await account.createEmailPasswordSession(email, password);
                        await useCreateProfile(userData.$id, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID),"");
                        await get().checkUser(); // Gọi checkUser sau khi register
                    } catch (error) {
                        throw error;
                    }
                },

                login: async (email: string, password: string) => {
                    try {
                        await account.createEmailPasswordSession(email, password);
                        await get().checkUser(); // Gọi checkUser sau khi login
                    } catch (error) {
                        throw error;
                    }
                },
                
                logout: async () => {
                    try {
                        await account.deleteSession("current");
                        set({ user: null });
                        if(get().router) {
                            get().router.refresh();
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }),
            {
                name: "user-store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
); 