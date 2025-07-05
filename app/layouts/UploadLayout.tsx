'use client';
import { usePathname } from "next/navigation";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNavMain";
export default function UploadLayout({children}: {children: React.ReactNode}) {
    const pathName = usePathname();
    return (
      <>
     <div className="bg-[#F8F8F8] h-[100vh]">
      <TopNav/>
        <div className="flex justify-between mx-auto w-full lg:px-2.5 px-0  max-w-[1140px]">
        
          {children}
        </div>
     </div>
      </>
    );
}