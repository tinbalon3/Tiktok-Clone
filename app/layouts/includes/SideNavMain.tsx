
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";


export default function SideNavMain() {
    const pathName = usePathname();
    const router = useRouter();
  
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
                        <div className="border-b border-gray-200 lg:ml-2 mt-2"/>
                        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                            Suggested accounts
                        </h3>
                        <div className="lg:hideen block pt-3"/>
                        <ClientOnly>
                            <div className="cursor-pointer">
                                <MenuItemFollow
                                    user={{id:'1',name:'John Weeks Dev',image:'https://tse3.mm.bing.net/th/id/OIP.J8d82ByQ3JYt-EuiR0tIzwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'}}
                                />
                            </div>
                        </ClientOnly>

                        <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                            See all
                        </button>
                        {true ? (
                            <div >
                        <div className="border-b border-gray-200 lg:ml-2 mt-2"/>
                        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                            Following accounts
                        </h3>
                        <div className="lg:hideen block pt-3"/>
                        <ClientOnly>
                            <div className="cursor-pointer">
                                <MenuItemFollow
                                    user={{id:'1',name:'John Weeks Dev',image:'https://tse3.mm.bing.net/th/id/OIP.J8d82ByQ3JYt-EuiR0tIzwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'}}
                                />
                            </div>
                        </ClientOnly>

                        <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                            See more
                        </button>
                                </div>
                        ) : null }
                        <div className="lg:block hidden border-b border-gray-200 lg:ml-2 mt-2"/>

                        <div className="lg:block hidden text-[11px] text-gray-500">
                            <p className="pt-4 px-2">About Newsroom TikTok Shop Contact Careers ByteDance</p>
                            <p className="pt-4 px-2">TikTok for Good Advertise Developers Transparency</p>
                            <p className="pt-4 px-2">Creator Portal Community Guidelines Safety Privacy</p>
                            <p className="pt-4 px-2">Terms of Service Help Center Creator Fund</p>
                            <p className="pt-4 px-2">© 2025 TikTok Clone</p>

                        </div>
                    </Link>
                </div>
           </div>
        </>
    )
}