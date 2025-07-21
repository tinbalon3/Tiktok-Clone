'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useCommentStore } from "@/app/store/comment";
import { useLikeStore } from "@/app/store/like";
import { usePostStore } from "@/app/store/post";
import { PostPageTypes } from "@/app/types"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Post({ params }: PostPageTypes) {
    const router = useRouter();
    const {postById, postsByUser, setPostById,setPostsByUser,allPosts} = usePostStore();
    let {setLikesByPost} = useLikeStore();
    let {setCommentsByPost} = useCommentStore();

    useEffect(() => {
        setPostById(unwrappedParams.postId);
        setPostsByUser(unwrappedParams.userId);
        setLikesByPost(unwrappedParams.postId);
        setCommentsByPost(unwrappedParams.postId);
    }, []);


  
    const unwrappedParams = use(params);

    const loopThroughPostsUp = () => {
        postsByUser.forEach((post, index) => {
            if(post.id > unwrappedParams.postId){
                router.push(`/post/${post.id}/${unwrappedParams.userId}`);
            }
        });
    }
    const loopThroughPostsDown = () => {
        postsByUser.forEach((post, index) => {
            if(post.id < unwrappedParams.postId){
                router.push(`/post/${post.id}/${unwrappedParams.userId}`);
            }
        });
    }
   
    return (
        <>
            <div
                id="PostPage"
                className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
            >
                <div className="lg:w-[calc(100%-540px)] relative h-full">
                    <Link href={`/profile/${unwrappedParams?.userId}`}
                        className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                        <AiOutlineClose size="27" />
                    </Link>
                    <div>
                        <button
                            onClick={() => loopThroughPostsUp()}
                            className="absolute text-white z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                            <BiChevronUp size="30" color="#ffffff" />
                        </button>

                        <button
                            onClick={() => loopThroughPostsDown()}
                            className="absolute text-white z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                            <BiChevronDown size="30" color="#ffffff" />
                        </button>
                    </div>

                    <img
                        className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
                        src="/images/tiktok-logo-small.png"
                        width={45}

                    />
                    <ClientOnly>
                        {postById?.video_url ? (
                            <video
                               
                                className="fixed object-cover w-full my-auto z-[0] h-screen"
                                src={useCreateBucketUrl(postById?.video_url)}
                            />
                        ) : null}
                       
                        <div className="bg-black/50 bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {postById?.video_url ? (
                                <video src={useCreateBucketUrl(postById?.video_url)}
                                    autoPlay
                                    loop
                                    muted
                                    controls
                                    className="h-screen mx-auto "
                                />
                            ) : null}
                        </div>
                    </ClientOnly>
                </div>
                <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-white">
                            <div className="py-7">
                            <ClientOnly>
                            {postById ? (
                                <CommentsHeader post={postById} params={unwrappedParams}/>
                            ) : null}
                        </ClientOnly>
                        <Comments params={unwrappedParams}/>
                            </div>
                    </div>
                </div>
                
            </>
            )
}