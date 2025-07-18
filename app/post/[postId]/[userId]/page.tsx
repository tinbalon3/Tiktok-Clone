'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import { PostPageTypes } from "@/app/types"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Post({ params }: PostPageTypes) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const loopThroughPostsUp = () => {
        console.log('loopThroughPostsUp');
    }
    const loopThroughPostsDown = () => {
        console.log('loopThroughPostsDown');
    }
    const postById = {
        id: '1',
        user_id: '1',
        video_url: '/video_demo.mp4',
        text: 'This is a sample video post',
        created_at: '2023-10-01T12:00:00Z',
        profile: {
          user_id: '1',
          name: 'John Weeks Dev',
          image: 'https://tse3.mm.bing.net/th/id/OIP.J8d82ByQ3JYt-EuiR0tIzwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        }
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
                        {postById ? (
                            <video
                                className="fixed object-cover w-full my-auto z-[0] h-screen"
                                src="/video_demo.mp4"

                            />
                        ) :
                            // You can add a fallback here if needed
                            null
                        }
                        <div className="bg-black/50 bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {true ? (
                                <video src="/video_demo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    controls
                                    className="h-screen mx-auto"
                                />
                            ) : null}
                        </div>
                    </ClientOnly>
                </div>
                <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-white">
                            <div className="py-7">
                                <ClientOnly>
                                    {postById?.video_url ? (
                                        <CommentsHeader post={postById} params={params}/>
                                    ):null}
                                </ClientOnly>
                                <Comments params={params} />
                            </div>
                    </div>
                </div>
                
            </>
            )
}