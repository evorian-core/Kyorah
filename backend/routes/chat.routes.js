import express from "express";

import betaOrAuthMiddleware
    from "../middlewares/betaOrAuth.middleware.js";

import { chat } from "../controllers/chat.controller.js";


const router =
    express.Router();


/* ===========================
   AUTENTICAÇÃO
=========================== */

router.use(
    betaOrAuthMiddleware
);


/* ===========================
   CHAT
=========================== */

router.post(
    "/",
    chat
);


export default router;