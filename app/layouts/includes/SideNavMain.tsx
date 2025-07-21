'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";
import { useGeneralStore } from "@/app/store/general";
import { useUser } from "@/app/context/user";
import { useEffect } from "react";


export default function SideNavMain() {

    const { setRandomUsers, randomUsers } = useGeneralStore();

    const contextUser = useUser();
    const pathName = usePathname();

    useEffect(() => {
        setRandomUsers([]);
    }, []);


    return (
        <>
            <div id="SideNavMain" className={`fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-gray-200 border-r w-[75px] overflow-auto ${pathName == '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}`}>
                <div className="lg:w-full w-[55px] mx-auto">
                    <Link href="/">
                        <MenuItem
                            iconString="For You"
                            colorString={pathName == '/' ? '#F02C56' : ''}
                            sizeString="25"
                        />
                        <MenuItem
                            iconString="Following"
                            colorString={pathName == '/' ? '#000000' : ''}
                            sizeString="25"
                        />
                        <MenuItem
                            iconString="LIVE"
                            colorString={pathName == '/' ? '#000000' : ''}
                            sizeString="25"
                        />
                    </Link>

                    <div className="border-b border-gray-200 lg:ml-2 mt-2" />
                    <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                        Suggested accounts
                    </h3>
                    <div className="lg:hideen block pt-3" />

                    <ClientOnly>
                        <div className="cursor-pointer">
                            {randomUsers.length > 0 && randomUsers.map((user, index) => (
                                <MenuItemFollow
                                    key={index}
                                    user={user}
                                />
                            ))}
                        </div>
                    </ClientOnly>

                    <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                        See all
                    </button>

                    {contextUser?.user?.id ? (
                        <div >
                            <div className="border-b border-gray-200 lg:ml-2 mt-2" />
                            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                                Following accounts
                            </h3>
                            <div className="lg:hideen block pt-3" />
                            <ClientOnly>
                                <div className="cursor-pointer">
                                    {randomUsers.length > 0 && randomUsers.map((user, index) => (
                                        <MenuItemFollow
                                            key={index}
                                            user={user}
                                        />
                                    ))}
                                </div>
                            </ClientOnly>

                            <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                                See more
                            </button>
                        </div>
                    ) : null}
                    <div className="lg:block hidden border-b border-gray-200 lg:ml-2 mt-2" />

                    <ClientOnly>
                        <p className="pt-4 px-2 text-[12px] text-gray-600">About Newsroom TikTok Shop Contact Careers ByteDance</p>
                        <p className="pt-4 px-2 text-[12px] text-gray-600">TikTok for Good Advertise Developers Transparency</p>
                        <p className="pt-4 px-2 text-[12px] text-gray-600">Creator Portal Community Guidelines Safety Privacy</p>
                        <p className="pt-4 px-2 text-[12px] text-gray-600">Terms of Service Help Center Creator Fund</p>
                        <p className="pt-4 px-2 text-[12px] text-gray-600">© 2025 TikTok Clone</p>
                    </ClientOnly>

                </div>
            </div>
        </>
    )
}