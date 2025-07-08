'use client'


import { CommentsTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";


export default function CommentsHeader({ params }: CommentsTypes) {
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
        },
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
        },
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
            <div id="Comments" className="relative  z-0 w-full h-[calc(100%-273px) border-t-2 border-gray-200 overflow-auto]">
                <div className="pt-2">
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
                </div>
            </div>
        </>
    )
}