'use client';
import { usePathname } from "next/navigation";
export default function MainLayout({children}: {children: React.ReactNode}) {
    const pathName = usePathname();
    return (
      <>
        <div className={`flex jutify-between mx-auto w-full lg:px-2.5 px-0 ${pathName == '/' ? 'max-w-[1140px]' : ''}` }>
        {children}
        </div>
      </>
    );
}