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
import 'dotenv/config';
import express from "express";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(express.static('public'))

// cho phép Next dev server gọi sang (điều chỉnh origin nếu cần)
app.use(cors({ origin: [/^http:\/\/localhost:\d+$/], credentials: false }));

// thư mục chứa ảnh gốc (lấy từ Next.js /public)
const PUBLIC_DIR = path.join(__dirname, "public");
// cho phép chỉ đọc file dưới PUBLIC_DIR để tránh path traversal
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]);

app.get("/img", async (req, res) => {
    try {
        const { src, w, q, f } = req.query;

        if (!src) return res.status(400).send("Missing src");
        // chặn path traversal
        const cleanSrc = path.normalize(src).replace(/^(\.\.(\/|\\|$))+/, "");
        const absPath = path.join(PUBLIC_DIR, cleanSrc);

        // kiểm tra tồn tại + phần mở rộng
        const ext = path.extname(absPath).toLowerCase();
        if (!ALLOWED_EXT.has(ext)) return res.status(400).send("Unsupported file type");
        await fs.access(absPath);

        // parse tham số
        const width = Math.max(1, Math.min(parseInt(w || "0", 10) || 0, 4096));
        const quality = Math.max(1, Math.min(parseInt(q || "75", 10), 100));

        // Auto chọn format: ưu tiên query ?f, nếu không thì theo Accept
        let format = (f || "").toLowerCase();
        if (!format) {
            const accept = req.headers["accept"] || "";
            if (accept.includes("image/avif")) format = "avif";
            else if (accept.includes("image/webp")) format = "webp";
            else if (ext === ".png") format = "png";
            else format = "jpeg";
        }

        // pipeline sharp
        let s = sharp(absPath, { unlimited: false });
        if (width > 0) s = s.resize({ width, withoutEnlargement: true });

        if (format === "jpeg" || format === "jpg") s = s.jpeg({ quality, mozjpeg: true });
        else if (format === "webp") s = s.webp({ quality });
        else if (format === "avif") s = s.avif({ quality });
        else if (format === "png") s = s.png(); // PNG không dùng quality theo cách này

        const buf = await s.toBuffer();

        // Header đúng để hiển thị inline + cache tốt
        res.setHeader("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
        // cache dài vì URL đã có w,q,f — coi như immutable
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        return res.status(200).end(buf);
    } catch (err) {
        console.error(err);
        if (err.code === "ENOENT") return res.status(404).send("Not Found");
        return res.status(500).send("Image processing error");
    }
});

// health check
app.get("/", (_req, res) => res.status(200).json({
    message: "Image Server is running...",
    author: "Hỏi Dân IT",
    website: "https://hoidanit.vn"
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Image server at http://localhost:" + PORT);
});
