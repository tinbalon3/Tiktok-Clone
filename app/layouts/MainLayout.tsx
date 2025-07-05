'use client';
import { usePathname } from "next/navigation";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNavMain";
export default function MainLayout({children}: {children: React.ReactNode}) {
    const pathName = usePathname();
    return (
      <>
      <TopNav/>
        <div className={`flex jutify-between mx-auto w-full lg:px-2.5 px-0 ${pathName == '/' ? 'max-w-[1140px]' : ''}` }>
        <SideNavMain/>
        {children}
        </div>
      </>
    );
}