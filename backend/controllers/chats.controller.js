import {

    getChats,
    createChat,
    deleteChat,

    getBetaChats,
    createBetaChat,
    deleteBetaChat,

} from "../services/chats.service.js";


import {
    getMessages,
    getBetaMessages,
} from "../services/message.service.js";


/* ===========================
   CHATS NORMAL
=========================== */

export async function getChatsController(
    req,
    res
) {

    try {

        const chats =
            await getChats(
                req.user.id
            );


        return res.json({

            success: true,

            chats,

        });

    }

    catch (err) {

        console.error(
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao buscar conversas.",

        });

    }

}


export async function createChatController(
    req,
    res
) {

    try {

        const chat =
            await createChat(

                req.user.id,

                req.body.title ||
                "Nova conversa"

            );


        return res.json({

            success: true,

            chat,

        });

    }

    catch (err) {

        console.error(
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao criar conversa.",

        });

    }

}


export async function deleteChatController(
    req,
    res
) {

    try {

        await deleteChat(

            req.params.id,

            req.user.id

        );


        return res.json({

            success: true,

        });

    }

    catch (err) {

        console.error(
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao excluir conversa.",

        });

    }

}


/* ===========================
   MENSAGENS NORMAL
=========================== */

export async function getMessagesController(
    req,
    res
) {

    try {

        const messages =
            await getMessages(

                req.params.id,

                req.user.id

            );


        return res.json({

            success: true,

            messages,

        });

    }

    catch (err) {

        console.error(
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao carregar mensagens.",

        });

    }

}


/* ===========================
   BETA — LISTAR CHATS
=========================== */

export async function getBetaChatsController(
    req,
    res
) {

    try {

        const betaUser =
            req.betaUser;


        if (!betaUser) {

            return res.status(
                401
            ).json({

                success: false,

                message:
                    "Usuário Beta não identificado.",

            });

        }


        const chats =
            await getBetaChats(
                betaUser
            );


        return res.json({

            success: true,

            chats,

        });

    }

    catch (err) {

        console.error(
            "Erro ao buscar chats Beta:",
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao buscar conversas Beta.",

        });

    }

}


/* ===========================
   BETA — CRIAR CHAT
=========================== */

export async function createBetaChatController(
    req,
    res
) {

    try {

        const betaUser =
            req.betaUser;


        if (!betaUser) {

            return res.status(
                401
            ).json({

                success: false,

                message:
                    "Usuário Beta não identificado.",

            });

        }


        const chat =
            await createBetaChat(

                betaUser,

                req.body.title ||
                "Kyorah Beta"

            );


        return res.json({

            success: true,

            chat,

        });

    }

    catch (err) {

        console.error(
            "Erro ao criar chat Beta:",
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao criar conversa Beta.",

        });

    }

}


/* ===========================
   BETA — MENSAGENS
=========================== */

export async function getBetaMessagesController(
    req,
    res
) {

    try {

        const betaUser =
            req.betaUser;


        if (!betaUser) {

            return res.status(
                401
            ).json({

                success: false,

                message:
                    "Usuário Beta não identificado.",

            });

        }


        const messages =
            await getBetaMessages(

                req.params.id,

                betaUser

            );


        return res.json({

            success: true,

            messages,

        });

    }

    catch (err) {

        console.error(
            "Erro ao carregar mensagens Beta:",
            err
        );


        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erro ao carregar mensagens Beta.",

        });

    }

}

/* ===========================
   BETA — EXCLUIR CHAT
=========================== */

export async function deleteBetaChatController(
    req,
    res
) {

    try {

        const betaUser =
            req.betaUser;


        if (!betaUser) {

            return res.status(401).json({

                success: false,

                message:
                    "Usuário Beta não identificado.",

            });

        }


        await deleteBetaChat(

            req.params.id,

            betaUser

        );


        return res.json({

            success: true,

        });

    }

    catch (err) {

        console.error(
            "Erro ao excluir chat Beta:",
            err
        );


        return res.status(500).json({

            success: false,

            message:
                err.message ||
                "Erro ao excluir conversa Beta.",

        });

    }

}