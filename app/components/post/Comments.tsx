'use client'


import { CommentsTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { BiLoaderCircle } from "react-icons/bi";
import { useCommentStore } from "@/app/store/comment";
import { useGeneralStore } from "@/app/store/general";
import { useUser } from "@/app/context/user";
import useCreateComment from "@/app/hooks/useCreateComment";


export default function Comments({ params }: CommentsTypes) {

    const { commentsByPost, setCommentsByPost } = useCommentStore();
    const {setIsLoginOpen} = useGeneralStore();

    const [comment, setComment] = useState<string>('');
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const contextUser = useUser();
    const addComment = async () => {
       if(!contextUser?.user) return setIsLoginOpen(true);
       try {
        setIsUploading(true);
        await useCreateComment(contextUser?.user?.id, params?.postId, comment);
        setCommentsByPost(params?.postId);
        setComment('');
       }
       catch(error){
        console.log(error);
       }
       finally{
        setIsUploading(false);
       }
    }


    

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