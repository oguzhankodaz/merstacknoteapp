

import { rateLimit } from "express-rate-limit";

// 1. GLOBAL RATE LIMIT (Uygulamanın en başına koy)
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    limit: 500,               // 100 istek
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      status: 429,
      message: "Too many requests, please try again later.", // ← Bu kısım!
    },
  });