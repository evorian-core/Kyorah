import { generateResponseStream } from "../providers/GeminiProvider.js";
import { generateImage } from "../providers/ImageProvider.js";
import { decideTool } from "../core/ToolRouter.js";

import { saveMessage } from "../services/message.service.js";


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

    console.log("🎨 Gerando imagem...");

    const image = await generateImage(message);

    console.log("✅ Imagem gerada.");

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
}


        // ==========================================
        // RESPOSTA NORMAL DA KYORAH
        // ==========================================


const conversation = [
    {
        role: "user",
        content: message,
    },
];


        const stream =
    await generateResponseStream(
        conversation,
        betaUser
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


        // Salva resposta normal
        await saveMessage(
            chatId,
            "assistant",
            assistantResponse,
            "text"
        );


        res.end();

    }


    catch (error) {

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