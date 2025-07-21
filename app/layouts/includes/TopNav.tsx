import { log } from "console";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useGeneralStore } from "@/app/store/general";
import { useUser } from "@/app/context/user";
import { useEffect, useState } from "react";
import { RandomUsers } from "@/app/types";
import debounce from "debounce";
import useSearchProfileByName from "@/app/hooks/useSearchProfileByName";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";

export default function TopNav() {

    const pathName = usePathname();
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([]);
    const contextUser = useUser();

    const { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

    useEffect(() => {
        setIsEditProfileOpen(false);
    }, []);

    const handleSearchName = debounce(async(event: { target: { value: string } }) => {
        const searchName = event.target.value;
       if(searchName == "") return setSearchProfiles([]);
       try {
            const res = await useSearchProfileByName(searchName);
            if(res) return setSearchProfiles(res);
            setSearchProfiles([]);
       }
       catch(error){
        console.log(error);
        setSearchProfiles([]);
        alert(error);
       }
    }, 500)
    const goTo = () => {
        if (!contextUser?.user) return setIsLoginOpen(true);
        router.push('/upload');
    }
    return (
        <>
            <div id="TopNav" className="fixed bg-white z-30 flex items-center w-full border-b border-gray-200 h-[60px]">
                <div className={`flex items-center justify-between mx-auto w-full gap-6 px-4 ${pathName == '/' ? 'max-w-[1150px]' : ''}`}>
                    <Link href="/">
                        <img className="min-w-[115px] w-[115px]" src="/images/tiktok-logo.png" alt="" />
                    </Link>
                    <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
                        <input type="text"
                            onChange={handleSearchName}
                            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
                            placeholder="Search accounts"
                        />

                       {searchProfiles.length > 0 ? (
                        <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-11 border-gray-200 border p-1">
                            {searchProfiles.map((profile,index) => (
                                 <div key={index} className="p-1">
                                 <Link
                                     className="flex items-center hover:bg-[#F12B56] justify-between w-full cursor-pointer p-1 px-2 hover:text-white"
                                     href={`/profile/${profile.id}`}>
                                     <div className="flex items-center">
                                         <img className="rounded-md" width="40" src={useCreateBucketUrl(profile.image)} />
                                         <div className="truncate ml-2">{profile.name}</div>
                                     </div>
                                 </Link>
                             </div>
                            ))}
                        </div>
                       ):null}
                        <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
                            <BiSearch color="#A1A2A7" size="22"></BiSearch>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => goTo()}
                            className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
                        >
                            <AiOutlinePlus color="#000000" size="22" />
                            <span className="px-2 font-medium text-[15px]"> Upload </span>
                        </button>
                        {!contextUser?.user?.id ? (
                            <div className="flex items-center">
                                <button onClick={() => setIsLoginOpen(true)} className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]">
                                    <span className="whitespace-nowrap mx-4 font-medium text-[15px]"> Log in</span>
                                </button>
                                <BsThreeDotsVertical />
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="relative">
                                    <button onClick={() => setShowMenu(showMenu => !showMenu)} className="mt-1 border border-gray-200 rounded-full">
                                        <img src={useCreateBucketUrl(contextUser?.user?.image)} className="rounded-full w-[35px] h-[35px]" />
                                    </button>
                                  {showMenu ? (
                                    <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
                                        <button onClick={() => router.push(`/profile/${contextUser?.user?.id}`)} className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                                            <BiUser size="20" />
                                            <span className="pl-2 font-semibold text-sm">Profile</span>
                                        </button>
                                        <button onClick={async() => {
                                            await contextUser?.logout();
                                            setShowMenu(false);
                                        }} className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                                            <FiLogOut size="20" />
                                            <span className="pl-2 font-semibold text-sm">Log out</span>
                                        </button>
                                    </div>
                                  ):null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}