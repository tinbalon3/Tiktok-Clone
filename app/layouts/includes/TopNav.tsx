import { usePathname, useRouter } from "next/navigation";

export default function TopNav() {
    const pathName = usePathname();
    const router = useRouter();
}