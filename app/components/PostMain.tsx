'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import { ImMusic } from 'react-icons/im';
import { AiFillHeart } from 'react-icons/ai';
import { PostMainTCompTypes } from '../types';
import PostMainLikes from './PostMainLikes';
import useCreateBucketUrl from '../hooks/useCreateBucketUrl';

export default function PostMain({ post }: PostMainTCompTypes) {
   
    useEffect(() => {
       
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`PostMain-${post?.id}`);
        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause();
            }, { threshold: [0.6] })
            observer.observe(postMainElement);
        }

    }, []);
    return (
        <>
            <div id={`PostMain-${post.id}`} className="flex border-b border-gray-200 py-6">
                {/* Avatar bên trái */}
                <div className="mr-3">
                    <img className="rounded-full max-h-[60px]" width="60" src={useCreateBucketUrl(post?.profile?.image)} />
                </div>
                {/* Nội dung chính */}
                <div className="w-full px-4">
                    {/* Tên user + nút follow */}
                    <div className="flex items-center justify-between pb-0.5">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>
                        <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                            Follow
                        </button>
                    </div>
                    {/* Caption, hashtag, nhạc */}
                    <p className='text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]'>{post.text} hello</p>
                    <p className='text-[14px] text-gray-500 pb-0.5'>#fun #cool #SuperAwrsome</p>
                    <p className='text-[14px] pb-0.5 flex items-center font-semibold'>
                        <ImMusic size="17"/>
                        <span className='px-1'>original sound - AWESOME</span>
                        <AiFillHeart/>
                    </p>
                    {/* Video + icon */}
                    <div className="flex mt-2.5">
                        <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
                            <video
                                id={`video-${post?.id}`}
                                className='rounded-xl object-cover mx-auto h-full'
                                src={useCreateBucketUrl(post?.video_url)}
                                controls
                                loop
                                muted
                            />
                            <img
                                className='absolute right-2 bottom-10'
                                width="90"
                                src="images/tiktok-logo-white.png"
                            />
                        </div>
                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
        </>
    )
}