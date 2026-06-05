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

'use client'
import Image, { ImageProps } from "next/image";

const NImage = (props: ImageProps) => {

    const localImageLoader = ({
        src,
        width,
        quality,
    }: {
        src: string
        width: number
        quality?: number
    }) => {
        const base = process.env.NEXT_PUBLIC_IMG_BASE || "http://localhost:4000"
        const q = quality ?? 75
        const clean = src.startsWith("/") ? src.slice(1) : src
        return `${base}/img?src=${encodeURIComponent(clean)}&w=${width}&q=${q}`
    }

    return (
        <>
            <Image loader={localImageLoader} {...props} />
        </>
    )
}

export default NImage;
