"use client";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useGeneralStore } from "../store/general";

export default function AuthOverlay() {
    const [isRegister, setIsRegister] = useState<boolean>(true)
    const { setIsLoginOpen } = useGeneralStore();
    return (
        <>
        <div
        id="AuthOverlay" 
        className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black/50">
            <div className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
                <div className="w-full flex justify-end">
                    <button className="p-1.5 rounded-full bg-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                    >
                        <AiOutlineClose size={26}/>
                    </button>
                </div>
               { isRegister ? (<Register/>):(<Login/>)}

               <div className="absolute flex items-center justify-center border-gray-200 py-5 left-0 bottom-0 border-t w-full">
                <span className="text-[14px] text-gray-600">Don't have an account? </span>

                <button className="text-[14px] text-[#F02C56] font-semibold pl-1"
                onClick={() => setIsRegister(isRegister => !isRegister)}
                >
                    {!isRegister ? "Register" : "Login"}
                </button>
               </div>
            </div>
            </div></>
    )
}