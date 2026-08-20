const API = `${import.meta.env.VITE_API_URL}/api`;


/* ===========================
   AUTENTICAÇÃO NORMAL
=========================== */

function getToken() {

    return localStorage.getItem("token");

}


function authHeaders() {

    return {

        "Content-Type": "application/json",

        Authorization:
            `Bearer ${getToken()}`,

    };

}


/* ===========================
   USUÁRIO BETA
=========================== */

function getBetaUser() {

    try {

        const saved =
            sessionStorage.getItem(
                "kyorah_beta_user"
            );

        return saved
            ? JSON.parse(saved)
            : null;

    }

    catch {

        return null;

    }

}


/* ===========================
   HEADERS BETA
=========================== */

function betaHeaders() {

    const betaUser =
        getBetaUser();


    if (!betaUser) {

        throw new Error(
            "Usuário Beta não encontrado."
        );

    }


    return {

        "Content-Type":
            "application/json",

        "X-Beta-Access":
            "true",

        "X-Beta-ID":
            betaUser.betaId,

        "X-Beta-Name":
            betaUser.name,

        "X-Beta-Code":
            betaUser.code,

    };

}


/* ===========================
   CHATS — NORMAL
=========================== */

export async function getChats() {

    const response =
        await fetch(
            `${API}/chats`,
            {
                method: "GET",

                headers:
                    authHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao buscar conversas."
        );

    }


    return data.chats;

}


/* ===========================
   CRIAR CHAT — NORMAL
=========================== */

export async function createChat(
    title = "Nova conversa"
) {

    const response =
        await fetch(
            `${API}/chats`,
            {
                method: "POST",

                headers:
                    authHeaders(),

                body:
                    JSON.stringify({
                        title,
                    }),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao criar conversa."
        );

    }


    return data.chat;

}


/* ===========================
   EXCLUIR CHAT — NORMAL
=========================== */

export async function deleteChat(
    chatId
) {

    const response =
        await fetch(
            `${API}/chats/${chatId}`,
            {
                method: "DELETE",

                headers:
                    authHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao excluir conversa."
        );

    }


    return true;

}


/* ===========================
   MENSAGENS — NORMAL
=========================== */

export async function getMessages(
    chatId
) {

    const response =
        await fetch(
            `${API}/chats/${chatId}/messages`,
            {
                method: "GET",

                headers:
                    authHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao carregar mensagens."
        );

    }


    return data.messages;

}


/* ===========================
   BETA — LISTAR CHATS
=========================== */

export async function getBetaChats() {

    const betaUser =
        getBetaUser();


    if (!betaUser) {

        throw new Error(
            "Usuário Beta não encontrado."
        );

    }


    console.log(
        "🧬 Buscando chats Beta:",
        betaUser
    );


    const response =
        await fetch(
            `${API}/chats/beta`,
            {
                method: "GET",

                headers:
                    betaHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao buscar conversas Beta."
        );

    }


    console.log(
        "🧬 Chats Beta:",
        data.chats
    );


    return data.chats;

}


/* ===========================
   BETA — CRIAR CHAT
=========================== */

export async function createBetaChat(
    title = "Kyorah Beta"
) {

    const betaUser =
        getBetaUser();


    if (!betaUser) {

        throw new Error(
            "Usuário Beta não encontrado."
        );

    }


    console.log(
        "🧬 Criando chat Beta:",
        betaUser
    );


    const response =
        await fetch(
            `${API}/chats/beta`,
            {
                method: "POST",

                headers:
                    betaHeaders(),

                body:
                    JSON.stringify({

                        title,

                        betaUser,

                    }),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao criar conversa Beta."
        );

    }


    console.log(
        "🧬 Chat Beta criado:",
        data.chat
    );


    /*
     * IMPORTANTE:
     *
     * O ID retornado aqui é um UUID real
     * criado pelo PostgreSQL.
     *
     * Exemplo:
     *
     * 8f6b1f42-....
     *
     * NÃO transformamos em:
     *
     * beta-Beta-002
     */


    return data.chat;

}


/* ===========================
   BETA — MENSAGENS
=========================== */

export async function getBetaMessages(chatId) {

    const betaUser =
        getBetaUser();


    if (!betaUser) {

        throw new Error(
            "Usuário Beta não encontrado."
        );

    }


    console.log(
        "🧬 Carregando mensagens Beta:",
        chatId
    );


    const response =
        await fetch(
            `${API}/chats/beta/${chatId}/messages`,
            {
                method: "GET",

                headers:
                    betaHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao carregar mensagens Beta."
        );

    }


    return data.messages;

}


/* ===========================
   ENVIAR MENSAGEM
=========================== */

export async function sendMessage(
    chatId,
    message,
    betaUser,
    onChunk,
    onImage
) {

    if (!chatId) {

        throw new Error(
            "Nenhum chat ativo."
        );

    }


    if (!message?.trim()) {

        throw new Error(
            "Mensagem vazia."
        );

    }


    const isBeta =
        !!betaUser;


    const headers =
        isBeta
            ? betaHeaders()
            : authHeaders();


    console.log(
        "📡 Enviando mensagem..."
    );


    console.log(
        "Modo:",
        isBeta
            ? "BETA"
            : "USUÁRIO"
    );


    console.log(
        "Chat:",
        chatId
    );


    console.log(
        "Beta:",
        betaUser
    );


    const response =
        await fetch(
            `${API}/chat`,
            {
                method: "POST",

                headers,

                body:
                    JSON.stringify({

                        chatId,

                        message,

                        betaUser,

                    }),

            }
        );


    /* ===========================
       ERRO HTTP
    =========================== */

    if (!response.ok) {

        let errorMessage =
            "Erro ao enviar mensagem.";


        try {

            const errorData =
                await response.json();


            errorMessage =
                errorData.message ||
                errorMessage;

        }

        catch {

            // resposta não JSON

        }


        console.error(
            "❌ Erro HTTP:",
            response.status,
            errorMessage
        );


        throw new Error(
            errorMessage
        );

    }


    /* ===========================
       BODY
    =========================== */

    if (!response.body) {

        throw new Error(
            "Resposta sem conteúdo."
        );

    }


    /* ===========================
       CONTENT TYPE
    =========================== */

    const contentType =
        response.headers.get(
            "content-type"
        );


    console.log(
        "📦 Content-Type recebido:",
        contentType
    );


    /* ===========================
       RESPOSTA JSON / IMAGEM
    =========================== */

    if (
        contentType &&
        contentType.includes(
            "application/json"
        )
    ) {

        const data =
            await response.json();


        console.log(
            "🎨 RESPOSTA JSON:",
            data
        );


        if (
            data.type === "image"
        ) {

            console.log(
                "🖼️ URL da imagem:",
                data.url
            );


            if (onImage) {

                onImage(data);

            }


            return data;

        }


        return data;

    }


    /* ===========================
       STREAMING DE TEXTO
    =========================== */

    console.log(
        "💬 Resposta de texto em streaming."
    );


    const reader =
        response.body.getReader();


    const decoder =
        new TextDecoder();


    while (true) {

        const {
            done,
            value,
        } =
            await reader.read();


        if (done) {

            break;

        }


        const chunk =
            decoder.decode(
                value,
                {
                    stream: true,
                }
            );


        if (
            chunk &&
            onChunk
        ) {

            onChunk(
                chunk
            );

        }

    }


    /*
     * Garante que os últimos bytes
     * do decoder sejam processados.
     */

    const finalChunk =
        decoder.decode();


    if (
        finalChunk &&
        onChunk
    ) {

        onChunk(
            finalChunk
        );

    }


    return true;

}

/* ===========================
   BETA — EXCLUIR CHAT
=========================== */

export async function deleteBetaChat(
    chatId
) {

    const betaUser =
        getBetaUser();


    if (!betaUser) {

        throw new Error(
            "Usuário Beta não encontrado."
        );

    }


    console.log(
        "🗑️ Excluindo chat Beta:",
        chatId
    );


    const response =
        await fetch(
            `${API}/chats/beta/${chatId}`,
            {
                method: "DELETE",

                headers:
                    betaHeaders(),

            }
        );


    const data =
        await response.json();


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.message ||
            "Erro ao excluir conversa Beta."
        );

    }


    console.log(
        "✅ Chat Beta excluído."
    );


    return true;

}