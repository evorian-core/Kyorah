import express from "express";

import betaOrAuthMiddleware
    from "../middlewares/betaOrAuth.middleware.js";

import { chat }
    from "../controllers/chat.controller.js";

const router = express.Router();

router.use(
    betaOrAuthMiddleware
);

router.post(
    "/",
    (req, res, next) => {

        console.log("🚨 POST /api/chat CHEGOU NA ROTA!");

        next();

    },
    chat
);

export default router;