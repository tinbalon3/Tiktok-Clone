"use client"
import ClientOnly from "@/app/components/ClientOnly";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import PostUser from "@/app/components/profile/PostUser";
import MainLayout from "@/app/layouts/MainLayout";
import { ProfilePageTypes } from "@/app/types"
import { BsPencil } from "react-icons/bs";

export default function Profile({ params }: ProfilePageTypes) {
    const currentProfile = {
        id: '1',
        user_id: '1',
        name: 'John Doe',
        image: 'data:image/webp;base64,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',
        followers: 100,
        following: 100,
        posts: 100,
        isFollowing: false,
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    }
 
    return (
        <>
            <MainLayout>
                <EditProfileOverlay />
                <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                    <div className="flex w-[calc(100vw-230px)]">
                        <ClientOnly>
                            {true ? (
                                <img src={currentProfile.image} className="w-[120px] min-w-[120px] rounded-full" alt="" />
                            ) : (
                                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                            )}
                        </ClientOnly>
                        <div className="ml-5 w-full">
                            <ClientOnly>
                                {currentProfile?.name ? (
                                    <div>
                                        <p className="text-[30px] font-bold truncate">{currentProfile?.name}</p>
                                        <p className="text-[18px] truncate">{currentProfile?.name}</p>
                                    </div>
                                ) : (
                                    <div className="h[-60px]"></div>
                                )}
                            </ClientOnly>
                            {true ? (
                                <button 
                                className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100">
                                    <BsPencil className="mt-0.5 mr-1" size={18}/>
                                    <span>Edit Profile</span>
                                </button>
                            ) : (
                                <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]"> Follow</button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center pt-4">
                        <div className="mr-4">
                            <span className="font-bold">10K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">Following</span>
                        </div>
                        <div className="mr-4">
                            <span className="font-bold">44K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">Followers</span>
                        </div>
                    </div>
                    <ClientOnly>
                        <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px] truncate">{currentProfile?.bio}</p>
                    </ClientOnly>

                    <ul className="w-full flex items-center pt-4 border-b border-gray-200">
                        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Video</li>
                        <li className="w-60 text-gray-500 text-center py-2 terxt-[17px] font-semibold">Likes</li>
                    </ul>
                    <ClientOnly>
                        <div className="grid mt-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                            <PostUser post={{
                                id: '1',
                                user_id: '1',
                                video_url: '/video_demo2.mp4',
                                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
                                created_at: '2021-01-01',
                            }}/>
                        </div>
                    </ClientOnly>
                </div>
            </MainLayout>
        </>
    )
}