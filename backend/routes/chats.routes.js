import express from "express";

import betaOrAuthMiddleware
    from "../middlewares/betaOrAuth.middleware.js";

import {
    getChatsController,
    createChatController,
    deleteChatController,
    getMessagesController,

    getBetaChatsController,
    createBetaChatController,
    getBetaMessagesController,
    deleteBetaChatController,

} from "../controllers/chats.controller.js";


const router =
    express.Router();


router.use(
    betaOrAuthMiddleware
);


/* ===========================
   BETA
=========================== */

router.get(
    "/beta",
    getBetaChatsController
);


router.post(
    "/beta",
    createBetaChatController
);


router.get(
    "/beta/:id/messages",
    getBetaMessagesController
);

router.delete(
    "/beta/:id",
    deleteBetaChatController
);

/* ===========================
   NORMAL
=========================== */

router.get(
    "/",
    getChatsController
);


router.post(
    "/",
    createChatController
);


router.delete(
    "/:id",
    deleteChatController
);


router.get(
    "/:id/messages",
    getMessagesController
);


export default router;