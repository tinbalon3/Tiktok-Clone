"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "@/libs/AppWriteClient";
import { useRouter } from "next/navigation";
import { User, UserContextTypes } from "../types";
import useGetProfileByUserId from "../hooks/userGetProfileByUserId";
import useCreateProfile from "../hooks/useCreateProfile";



const UserContext = createContext<UserContextTypes | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async () => {
        try {
            const currentSession = await account.getSession("current");
           
            if (!currentSession) {
                return;
            }
            const userData = await account.get() as any;
            const profile = await useGetProfileByUserId(userData.$id);
            setUser({
                id: userData.$id,
                name: profile?.name,
                bio: profile?.bio,
                image: profile?.image,
            })
           
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    const register = async (name: string, email: string, password: string) => {
        try {
            const userData = await account.create(ID.unique(), email, password, name);
            await account.createEmailPasswordSession(email, password);
            await useCreateProfile(userData.$id, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID), "");
            await checkUser();
        } catch (error) {
            throw error;
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await checkUser();
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            router.refresh()
        } catch (error) {
            throw error;
        }
    }


    return (
        <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider;

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}