"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { UploadError } from "../types";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import { useUser } from "../context/user";
import useCreatePost from "../hooks/useCreatePost";

export default function Upload() {
    const router = useRouter();
    const contextUser = useUser();

    let [fileDisplay, setFileDisplay] = useState<string>('');
    let [caption, setCaption] = useState<string>('');
    let [file, setFile] = useState<File | null>(null);
    let [error, setError] = useState<UploadError | null>(null);
    let [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if(!contextUser?.user){
            router.push('/');
        }
    }, [contextUser]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFile(file);
            setFileDisplay(fileUrl);
          
         
        }
    }
    const clearVideo = () => {
        setFile(null);
        setFileDisplay('');
    }

    const discard = () => {
        setFile(null);
        setFileDisplay('');
        setCaption('');
      
    }
    const validate = () => {
        setError(null);
        let isError = false;

        if(!file){
            setError({message: 'Please select a video to upload', type: 'file'});
            isError = true;
        }
        if(!caption){
            setError({message: 'Please add a caption', type: 'caption'});
            isError = true;
        }
        
        return isError;
    }

    const createNewPost = async () => {
        let isError = validate();
        if(isError){
            return;
        }
        if(!file || !contextUser?.user){
            return;
        }
        try {
            setIsUploading(true);
            await useCreatePost(file, contextUser?.user?.id, caption);
            router.push(`/profile/${contextUser?.user?.id}`);
            setIsUploading(false);
        }
        catch(error){
            console.log(error);
            setIsUploading(false);
            alert(error)
        }
        finally{
            setIsUploading(false);
        }
    }


    return (
        <>
            <UploadLayout>
                <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4" >
                    <div>
                        <h1 className="text-[23px] font-semibold">Upload Video</h1>
                        <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
                    </div>
                    <div className="mt-8 md:flex gap-6">
                        {!fileDisplay ? (
                            <label htmlFor="fileInput"
                                className="
                             md:mx-0
                                    mx-auto
                                    mt-4
                                    mb-6
                                    flex 
                                    flex-col 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[470px] 
                                    text-center 
                                    p-3 
                                    border-2 
                                    border-dashed 
                                    border-gray-300 
                                    rounded-lg 
                                    hover:bg-gray-100 
                                    cursor-pointer
                            "
                            >
                                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                                <p className="mt-4 text-[17px]">Select video to upload</p>
                                <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
                                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                                <p className="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</p>
                                <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>
                                <label htmlFor="fileInput"
                                    className="
                                    px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-md cursor-pointer
                                    "
                                >
                                    Select file
                                </label>
                                <input type="file" id="fileInput" onChange={onChange} accept=".mp4" className="hidden" />
                            </label>
                        ) : (
                            <div
                                className="
                            md:mx-0
                            mx-auto
                            mt-4
                            md:mb-12
                            mb-16
                            flex
                            w-full
                            max-w-[260px]
                            h-[540px]
                            p-3
                            rounded-2xl
                            cursor-pointer
                            relative
                            items-center
                            justify-center
                            "
                            >
                                {isUploading ? (
                                    <div
                                        className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                                        <div className="mx-auto flex items-center justify-center gap-1">
                                            <BiLoaderCircle size="30" color="#F12B56" className="animate-spin" />
                                            <div className="text-white font-bold"> Uploading...</div>
                                        </div>
                                    </div>
                                ) : null}
                                <img className="absolute z-20 pointer-events-none" src="/images/mobile-case.png" />
                                <img className="absolute right-4 bottom-6 z-20 " width="90" src="/images/tiktok-logo-white.png" alt="" />
                                <video autoPlay controls loop muted src={fileDisplay}
                                    className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                                />

                                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                                    <div className="flex items-center truncate">
                                        <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                                        <p className="text-[11px] pl-1 truncate text-ellipsis">
                                            {file ? file?.name : ''}
                                        </p>
                                    </div>
                                    <button onClick={() => clearVideo()} className="hover:underline cursor-pointer text-[11px] ml-2 font-semibold">
                                        Change
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="mt-4 mb-6">
                            <div className="flex bg-[#F8F8F8] py-4 px-6" >
                                <div>
                                    <PiKnifeLight size="25" className="mr-4" />
                                </div>
                                <div>
                                    <div className="text-semibold text-[15px] mb-1.5">
                                        Divide videos and edit
                                    </div>
                                    <div className="text-semibold text-[13px] text-gray-400">
                                        You can quickly divide your video into multiple parts,
                                        remove reduntant parts and turn landscape videos into portrait videos.
                                    </div>
                                </div>
                                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                                    <button className="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <div className="mb-1 text-[15px]">Caption</div>
                                    <div className="text-gray-400 text-[12px]">{caption.length}/150</div>

                                </div>
                                <input type="text" maxLength={150} className="w-full border p-2.5 rounded-md focus:outline-none" 
                                value={caption} onChange={event=> setCaption(event.target.value)}/>
                            </div>
                            <div className="flex gap-3">
                                <button disabled={isUploading}
                                className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-md"
                                onClick={()=> discard()}>
                                    Discard
                                </button>
                                <button disabled={isUploading}
                                className="px-10 py-2.5 mt-8 border text-[16px]  text-white bg-[#F02C56] rounded-md"
                                onClick={()=> createNewPost()}>
                                    {isUploading ? <BiLoaderCircle 
                                    size={25}
                                    className="animate-spin" color="#ffffff"/> : 'Post'}
                                </button>
                            </div>
                            {error? (
                                <div className="mt-4 text-red-500">
                                    {error.message}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

            </UploadLayout>
        </>
    )
    
}