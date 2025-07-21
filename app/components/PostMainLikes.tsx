'use client'
import React, { useEffect, useState } from 'react'

import { AiFillHeart } from 'react-icons/ai';
import { Comment, Like, PostMainLikesTCompTypes, PostMainTCompTypes } from '../types';
import { BiLoaderCircle } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import { useUser } from '../context/user';
import { useGeneralStore } from '../store/general';
import useGetCommentsByPostId from '../hooks/useGetCommentsByPostId';
import useGetLikesByPostId from '../hooks/useGetLikesByPostId';
import useIsLiked from '../hooks/useIsLiked';
import useCreateLike from '../hooks/useCreateLike';
import useDeleteLike from '../hooks/useDeleteLike';

export default function PostMainLikes({ post }: PostMainLikesTCompTypes) {

    const {setIsLoginOpen} = useGeneralStore();
    const contextUser = useUser();

    const [hasClickedLike, setHasClickedLike] = useState(false);
    const [likes, setLikes] = useState<Like[]>([]);
    const [userLiked, setUserLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const router = useRouter();

    useEffect(() => {
        getAllCommentsByPost();
        getAllLikesByPost();
    }, [post]);

    useEffect(() => {
        hasUserLikedPost();
    }, [likes, contextUser]);

    const hasUserLikedPost = () => {
        if(!contextUser?.user) return;
        if(likes.length < 1 || !contextUser?.user?.id){
            setUserLiked(false);
            return;
        }
        let res = useIsLiked(contextUser?.user?.id, post?.id, likes);
        setUserLiked(res ? true : false);
    }

    const getAllCommentsByPost = async () => {
        try {
            const res = await useGetCommentsByPostId(post?.id);
            setComments(res);
        }
        catch(error){
            console.log(error);
        }
    }

    const getAllLikesByPost = async () => {
        try {
            const res = await useGetLikesByPostId(post?.id);
            setLikes(res);
        }
        catch(error){
            console.log(error);
        }
    }

    const like = async () => {
        try {
            setHasClickedLike(true);
            await useCreateLike(contextUser?.user?.id || '', post?.id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        }
        catch(error){
            console.log(error);
        }
    }

    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true);
            await useDeleteLike(id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        }
        catch(error){
            console.log(error);
        }
    }

    const likeOrUnlike = () => {
        if(!contextUser?.user?.id) return setIsLoginOpen(true);

        let res = useIsLiked(contextUser?.user?.id, post?.id, likes);
        if(!res) {
            like();
        }
        else {
            likes.forEach((like) => {
                if(like.user_id === contextUser?.user?.id && like.post_id === post?.id ) {
                    unlike(like.id);
                }
            });
        }
     }
    return (
        <>
            <div id={`PostMainLikes-${post?.id}`} className='relative mr-[75px]'>
                <div className='absolute bottom-0 pl-2'>
                    <div className='pb-4 text-center'>
                        <button
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()}
                            className='rounded-full bg-gray-200 p-2 cursor-pointer'
                        >
                            {~hasClickedLike ?
                             (<AiFillHeart color={likes?.length > 0 && userLiked ? '#ff2626' : ''} size="25"/>) : 
                             (<BiLoaderCircle className='animate-spin' size="25" />)}
                        </button>
                        <span className='text-xs text-gray-800 font-semibold'>
                            {likes.length}
                        </span>
                    </div>
                    <button className='pb-4 text-center' onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)}>
                        <div className='rounded-full bg-gray-200 p-2 cursor-pointer'>
                            <FaCommentDots size="25"/>
                        </div>
                        <span className='text-x text-gray-800 font-semibold'>
                            {comments?.length}
                        </span>
                    </button>

                    <button className='text-center'>
                        <div className='rounded-full bg-gray-200 p-2 cursor-pointer'>
                            <FaShare size="25"/>
                        </div>
                        <span className='text-x text-gray-800 font-semibold'>
                           55
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}