'use client'


import { CommentsTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { BiLoaderCircle } from "react-icons/bi";


export default function CommentsHeader({ params }: CommentsTypes) {
    const [comment, setComment] = useState<string>('');
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const addComment = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
        }, 2000);
    }


    const commentsByPost = [
        {
            id: '123',
            user_id: '134',
            post_id: '432',
            text: 'This is a sample video post',
            created_at: '2023-10-01T12:00:00Z',
            profile: {
                user_id: '1',
                name: 'John Weeks Dev',
                image: 'https://tse3.mm.bing.net/th/id/OIP.J8d82ByQ3JYt-EuiR0tIzwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
            }
        }
        
    ]

    return (
        <>
            <div id="Comments" className="relative  z-0 w-full h-[calc(100%-273px) border-t-2
             border-gray-200 overflow-auto]">
                <div className="pt-2"/>
                    <ClientOnly>
                        {commentsByPost.length < 1 ? (
                            <div className="text-center mt-6 text-xl text-gray-500">No comments...</div>
                           )
                         : (
                            <div>
                            {commentsByPost.map((comment) => (
                                <SingleComment key={comment.id} comment={comment} params={params} />
                            ))}
                            </div>
                           
                        )}
                    </ClientOnly>
                    <div className="mb-28"/>
                </div>

                <div id="CreateComment" className="absolute flex items-center justify-between bottom-0 border-gray-200 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2">
                <div 
                    className={`
                        bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]
                        ${inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'}
                    `}
                >
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg" 
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => setInputFocused(false)}
                        onBlur={() => setInputFocused(true)}
                    />
                    </div>
                    {!isUploading ? (
                        <button disabled={!comment.trim()} onClick={() => addComment()} className={`
                            font-semibold text-sm ml-5 pr-1
                            ${comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'}
                        `}>
                            Post
                        </button>
                    ) : (
                        <BiLoaderCircle className="animate-spin" color="#E91E62" size={20}/>
                    )}
                   
                </div>
           
        </>
    )
}