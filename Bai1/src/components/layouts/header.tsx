/*
* Author: Hỏi Dân IT - @hoidanit   
* 
* This source code is developed for the course 
* "Next.js TypeScript Siêu Tốc". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import Link from 'next/link';
import './layout.css';

const Header = () => {
    return (
        <header>
            <div className="container-header">
                <div className="logo">Hỏi Dân IT</div>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/user">Users</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blogs</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
