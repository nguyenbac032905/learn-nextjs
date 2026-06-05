import Counter from "@/components/Counter/Counter";
import "./global.css";
import UserTable from "@/components/UserTable/UserTable";
import { notFound } from "next/navigation";
import NImage from "@/components/layouts/n.image";
import Image from "next/image";

interface User {
    id: number;
    name: string;
    email: string;
}

export const metadata = {
    openGraph: {
        title: 'Cong ty nguyen van bac',
        description: 'Cong ty nguyen van bac la cong ty co trach nhiem huu han',
        url: 'https://nextjs.org',
        siteName: 'Next.js',
        images: [
            {
                url: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-b%C3%A0u-tr%E1%BB%9Di-c%E1%BB%B1c-%C4%91%E1%BA%B9p-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-cao-s%E1%BA%AFc-n%C3%A9t.jpg', // Must be an absolute URL
                width: 800,
                height: 600,
            }
        ],
        locale: 'vi_VN',
        type: 'website',
    },
}

const HomePage = async () => {
    const res = await fetch("http://localhost:8000/users",{
        cache: "force-cache",
        next: {tags: ["user"]}
    });
    
    const data: User[] = await res.json();
    
    return (
        <>
            <div className="container">
                {/* <Counter /> */}
                <div>
                    <img src="http://localhost:4000/big-mua-thu.jpg" width={500} height={500}/>
                    <NImage src="/big-mua-thu.jpg" alt="Big Mua Thu" width={500} height={500} />
                </div>
                <div className="user-table">
                    <h1>User Table</h1>
                    <UserTable users={data}/>
                </div>
            </div>
        </>
    );
}
export default HomePage;
