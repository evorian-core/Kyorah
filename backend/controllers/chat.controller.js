import { generateResponseStream } from "../providers/GeminiProvider.js";
import { generateImage } from "../providers/ImageProvider.js";
import { decideTool } from "../core/ToolRouter.js";

import {
    saveMessage,
    getMessages,
    getBetaMessages,
} from "../services/message.service.js";

import {
    verifyUserChatAccess,
    verifyBetaChatAccess,
} from "../services/chats.service.js";


export async function chat(req, res) {

    try {

        console.log("========== CHAT ==========");
        console.log(req.body);


        const {
            chatId,
            message,
            betaUser,
        } = req.body;


        if (!chatId) {

            return res.status(400).json({

                success: false,
                message: "Chat não informado.",

            });

        }


        if (!message) {

            return res.status(400).json({

                success: false,
                message: "Mensagem não enviada.",

            });

        }


        // ==========================================
        // VERIFICAÇÃO DE ACESSO AO CHAT
        // ==========================================

        let hasAccess = false;


        if (req.betaUser) {

            hasAccess =
                await verifyBetaChatAccess(
                    chatId,
                    req.betaUser
                );

        } else if (req.user) {

            hasAccess =
                await verifyUserChatAccess(
                    chatId,
                    req.user.id
                );

        }


        if (!hasAccess) {

            return res.status(403).json({

                success: false,

                message:
                    "Você não tem acesso a esta conversa.",

            });

        }


        // ==========================================
        // SALVA MENSAGEM DO USUÁRIO
        // ==========================================

        await saveMessage(
            chatId,
            "user",
            message,
            "text"
        );


        // ==========================================
        // DETECÇÃO DE FERRAMENTA
        // ==========================================

        const tool =
            decideTool(message);


        console.log(
            "Ferramenta detectada:",
            tool
        );


        // ==========================================
        // GERAÇÃO DE IMAGEM
        // ==========================================

        if (tool === "image") {

            console.log(
                "🎨 Gerando imagem..."
            );


            try {

                const image =
                    await generateImage(
                        message
                    );


                console.log(
                    "✅ Imagem gerada."
                );


                await saveMessage(
                    chatId,
                    "assistant",
                    image,
                    "image"
                );


                res.setHeader(
                    "Content-Type",
                    "application/json; charset=utf-8"
                );


                return res.end(
                    JSON.stringify({

                        success: true,

                        type: "image",

                        url: image,

                    })
                );


            } catch (imageError) {

                console.error(
                    "❌ Erro na geração de imagem:",
                    imageError
                );


                const errorText =
                    String(
                        imageError?.message ||
                        imageError ||
                        ""
                    ).toLowerCase();


                /*
                 * Detecta respostas típicas de limite
                 * dos provedores de geração.
                 */

                const isLimit =
                    imageError?.status === 429 ||
                    imageError?.statusCode === 429 ||
                    errorText.includes(
                        "rate limit"
                    ) ||
                    errorText.includes(
                        "too many requests"
                    ) ||
                    errorText.includes(
                        "quota"
                    ) ||
                    errorText.includes(
                        "limit"
                    ) ||
                    errorText.includes(
                        "insufficient"
                    );


                if (isLimit) {

                    console.log(
                        "⚠️ Limite de geração de imagens atingido."
                    );


                    return res.status(429).json({

                        success: false,

                        type: "image_limit",

                        message:
                            "🖼️ Limite de geração de imagens atingido\n\n" +
                            "Você atingiu o limite de gerações de imagem disponível durante o Kyorah Beta.\n\n" +
                            "Isso faz parte das limitações desta fase de testes e não significa que há um problema com sua conta.\n\n" +
                            "Aguarde até que o limite seja renovado para tentar gerar novas imagens.\n\n" +
                            "Kyorah Beta — em constante evolução. 💙",

                    });

                }


                /*
                 * Outros erros de geração.
                 */

                return res.status(500).json({

                    success: false,

                    type: "image_error",

                    message:
                        "Não foi possível gerar a imagem no momento.",

                });

            }

        }


        // ==========================================
        // RESPOSTA NORMAL DA KYORAH
        // ==========================================


        // ==========================================
        // CARREGA HISTÓRICO DA CONVERSA
        // ==========================================

        let history = [];


        if (req.betaUser) {

            history =
                await getBetaMessages(
                    chatId,
                    req.betaUser
                );

        } else if (req.user) {

            history =
                await getMessages(
                    chatId,
                    req.user.id
                );

        }


        // ==========================================
        // CONVERTE HISTÓRICO PARA O FORMATO DA IA
        // ==========================================

        const conversation =
            history
                .filter(
                    msg =>
                        msg.type === "text" &&
                        msg.content
                )
                .map(
                    msg => ({

                        role:
                            msg.role,

                        content:
                            msg.content,

                    })
                );


        // ==========================================
        // GERA RESPOSTA
        // ==========================================

        const stream =
            await generateResponseStream(
                conversation,
                req.betaUser
            );


        let assistantResponse = "";


        res.setHeader(
            "Content-Type",
            "text/plain; charset=utf-8"
        );


        res.setHeader(
            "Transfer-Encoding",
            "chunked"
        );


        for await (
            const chunk of stream
        ) {

            const content =
                chunk
                    .choices?.[0]
                    ?.delta?.content;


            if (!content) continue;


            assistantResponse +=
                content;


            res.write(
                content
            );

        }


        // ==========================================
        // SALVA RESPOSTA NORMAL
        // ==========================================

        await saveMessage(
            chatId,
            "assistant",
            assistantResponse,
            "text"
        );


        res.end();


    } catch (error) {

        console.error(
            "Erro no chat:",
            error
        );


        if (!res.headersSent) {

            return res.status(500).json({

                success: false,

                message:
                    "Erro ao gerar resposta.",

            });

        }


        res.end();

    }

}