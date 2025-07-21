"use client"
import ClientOnly from "@/app/components/ClientOnly";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import PostUser from "@/app/components/profile/PostUser";
import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import MainLayout from "@/app/layouts/MainLayout";
import { useGeneralStore } from "@/app/store/general";
import { usePostStore } from "@/app/store/post";
import { useProfileStore } from "@/app/store/profile";
import { ProfilePageTypes } from "@/app/types"
import { use, useEffect } from "react";
import { BsPencil } from "react-icons/bs";

export default function Profile({ params }: ProfilePageTypes) {

    const unwrappedParams = use(params)
    let contextUser = useUser()
    let { setCurrentProfile, currentProfile } = useProfileStore()
    let { postsByUser, setPostsByUser } = usePostStore()
    let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore();

    useEffect(() => {
        setCurrentProfile(unwrappedParams.id)
        setPostsByUser(unwrappedParams.id)
    }, [])

    return (
        <>
            <MainLayout>
                {isEditProfileOpen ? <EditProfileOverlay /> : null}
                <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                    <div className="flex w-[calc(100vw-230px)]">
                        <ClientOnly>
                            {currentProfile ? (
                                <img src={useCreateBucketUrl(currentProfile?.image)} className="w-[120px] min-w-[120px] rounded-full" alt="" />
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
                            {unwrappedParams.id === contextUser.user?.id ? (
                                <button
                                    onClick={() => setIsEditProfileOpen(isEditProfileOpen = !isEditProfileOpen)}
                                    className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100">
                                    <BsPencil className="mt-0.5 mr-1" size={18} />
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
                            {postsByUser.length > 0 && postsByUser.map((post, index) => (
                                <PostUser key={index} post={post} />
                            ))}
                           
                        </div>
                    </ClientOnly>
                </div>
            </MainLayout>
        </>
    )
}