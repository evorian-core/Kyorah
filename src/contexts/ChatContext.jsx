import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAI } from "../providers/AIProvider";
import { useAuth } from "./AuthContext";

import { detectMemory } from "../services/memoryDetector";
import { saveMemory } from "../storage/memoryStorage";

import {
    getChats,
    getMessages,
    createChat,
    getBetaChats,
    createBetaChat,
    getBetaMessages,
    deleteChat as deleteChatAPI,
    deleteBetaChat as deleteBetaChatAPI,

    sendMessage as sendMessageAPI,
} from "../services/chatApi";


/* ===========================
   BETA USER
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
   CONTEXT
=========================== */

const ChatContext =
    createContext();


export function ChatProvider({
    children,
}) {

    const { aiConfig } =
        useAI();


    const {
        user,
        loading: authLoading,
        getToken,
    } = useAuth();


    /* ===========================
       ESTADOS
    =========================== */

    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        generatingImage,
        setGeneratingImage,
    ] = useState(false);


    const [
        status,
        setStatus,
    ] = useState("idle");


    const [
        chats,
        setChats,
    ] = useState([]);


    const [
        activeChat,
        setActiveChat,
    ] = useState(null);


    /* ===========================
       IDENTIFICAR MODO
    =========================== */

    const betaUser =
        getBetaUser();


    const isBeta =
        !!betaUser;


    /* ===========================
       CARREGAR CHATS
    =========================== */

    useEffect(() => {

        if (authLoading) {
            return;
        }


        /*
         * Usuário normal
         */

        if (user) {

            loadChats();

            return;

        }


        /*
         * Usuário Beta
         */

        const currentBetaUser =
            getBetaUser();


        if (currentBetaUser) {

            loadBetaChat();

            return;

        }


        console.log(
            "⚠️ Nenhum usuário autenticado."
        );

    }, [
        user,
        authLoading,
    ]);


    /* ===========================
       CARREGAR CHATS NORMAIS
    =========================== */

    async function loadChats() {

        console.log(
            "========== LOAD CHATS =========="
        );


        console.log(
            "👤 Usuário:",
            user
        );


        console.log(
            "🔑 Token:",
            getToken()
        );


        try {

            const serverChats =
                await getChats();


            console.log(
                "📚 Chats encontrados:",
                serverChats
            );


            /*
             * Nenhum chat ainda
             */

            if (
                serverChats.length === 0
            ) {

                const chat =
                    await createChat();


                setChats([
                    {
                        ...chat,
                        messages: [],
                    },
                ]);


                setActiveChat(
                    chat.id
                );


                console.log(
                    "🆕 Chat criado:",
                    chat.id
                );


                return;

            }


            /*
             * Carregar mensagens
             */

            const chatsWithMessages =
                await Promise.all(

                    serverChats.map(
                        async chat => {

                            const messages =
                                await getMessages(
                                    chat.id
                                );


                            return {

                                ...chat,

                                messages:
                                    messages.map(
                                        normalizeMessage
                                    ),

                            };

                        }
                    )

                );


            setChats(
                chatsWithMessages
            );


            /*
             * Selecionar primeiro chat
             */

            if (
                chatsWithMessages.length > 0
            ) {

                setActiveChat(
                    chatsWithMessages[0].id
                );


                console.log(
                    "✅ Chat ativo:",
                    chatsWithMessages[0].id
                );

            }

        }

        catch (err) {

            console.error(
                "❌ Erro ao carregar chats:",
                err
            );

        }

    }


    /* ===========================
       CARREGAR CHAT BETA
    =========================== */

    async function loadBetaChat() {

        const currentBetaUser =
            getBetaUser();


        if (!currentBetaUser) {

            console.error(
                "❌ Usuário Beta não encontrado."
            );

            return;

        }


        console.log(
            "========== LOAD BETA =========="
        );


        console.log(
            "🧬 Beta:",
            currentBetaUser
        );


        try {

            const betaChats =
                await getBetaChats();


            console.log(
                "🧬 Chats Beta encontrados:",
                betaChats
            );


            /*
             * Já existe um chat Beta
             */

            if (
                betaChats.length > 0
            ) {

                const chatsWithMessages =
                    await Promise.all(

                        betaChats.map(
                            async chat => {

                                /*
                                 * IMPORTANTE:
                                 *
                                 * Aqui usamos
                                 * getBetaMessages().
                                 *
                                 * Não usamos getMessages().
                                 */

                                const messages =
                                    await getBetaMessages(
                                        chat.id
                                    );


                                return {

                                    ...chat,

                                    messages:
                                        messages.map(
                                            normalizeMessage
                                        ),

                                };

                            }
                        )

                    );


                setChats(
                    chatsWithMessages
                );


                /*
                 * O ID continua sendo o UUID
                 * real vindo do PostgreSQL.
                 */

                setActiveChat(
                    chatsWithMessages[0].id
                );


                console.log(
                    "✅ Chat Beta ativo:",
                    chatsWithMessages[0].id
                );


                return;

            }


            /*
             * Nenhum chat Beta ainda.
             */

            console.log(
                "🆕 Nenhum chat Beta encontrado."
            );


            const chat =
                await createBetaChat();


            console.log(
                "🧬 Novo chat Beta:",
                chat
            );


            setChats([
                {
                    ...chat,
                    messages: [],
                },
            ]);


            /*
             * IMPORTANTE:
             *
             * chat.id é UUID real.
             */

            setActiveChat(
                chat.id
            );


            console.log(
                "✅ Chat Beta ativo:",
                chat.id
            );

        }

        catch (err) {

            console.error(
                "❌ Erro ao carregar chat Beta:",
                err
            );

        }

    }


    /* ===========================
       NORMALIZAR MENSAGEM
    =========================== */

    function normalizeMessage(
        msg
    ) {

        return {

            role:
                msg.role,

            type:
                msg.type ||
                "text",

            text:
                msg.type === "image"
                    ? ""
                    : msg.content,

            url:
                msg.type === "image"
                    ? msg.content
                    : undefined,

        };

    }


    /* ===========================
       CARREGAR MENSAGENS
       QUANDO TROCA DE CHAT
    =========================== */

    useEffect(() => {

        if (!activeChat) {

            return;

        }


        /*
         * Se for Beta, não usamos
         * a rota normal.
         */

        if (getBetaUser()) {

            loadBetaMessages(
                activeChat
            );

            return;

        }


        loadMessages(
            activeChat
        );

    }, [
        activeChat,
    ]);


    /* ===========================
       MENSAGENS NORMAIS
    =========================== */

    async function loadMessages(
        chatId
    ) {

        try {

            const messages =
                await getMessages(
                    chatId
                );


            setChats(
                prev =>
                    prev.map(
                        chat =>

                            chat.id === chatId

                                ? {

                                    ...chat,

                                    messages:
                                        messages.map(
                                            normalizeMessage
                                        ),

                                }

                                : chat

                    )
            );

        }

        catch (err) {

            console.error(
                "❌ Erro ao carregar mensagens:",
                err
            );

        }

    }


    /* ===========================
       MENSAGENS BETA
    =========================== */

    async function loadBetaMessages(
        chatId
    ) {

        try {

            const messages =
                await getBetaMessages(
                    chatId
                );


            setChats(
                prev =>
                    prev.map(
                        chat =>

                            chat.id === chatId

                                ? {

                                    ...chat,

                                    messages:
                                        messages.map(
                                            normalizeMessage
                                        ),

                                }

                                : chat

                    )
            );

        }

        catch (err) {

            console.error(
                "❌ Erro ao carregar mensagens Beta:",
                err
            );

        }

    }


    /* ===========================
       CHAT ATUAL
    =========================== */

    const currentChat =
        chats.find(
            chat =>
                chat.id === activeChat
        );


    const messages =
        currentChat?.messages ||
        [];


    /* ===========================
       ATUALIZAR MENSAGENS
    =========================== */

    function updateMessages(
        newMessages
    ) {

        setChats(
            prev =>
                prev.map(
                    chat =>

                        chat.id === activeChat

                            ? {

                                ...chat,

                                messages:
                                    newMessages,

                            }

                            : chat

                )
        );

    }


    /* ===========================
       NOVO CHAT
    =========================== */

    async function newChat() {

        try {

            /*
             * Beta
             */

            if (
                getBetaUser()
            ) {

                const chat =
                    await createBetaChat();


                setChats(
                    prev => [

                        {
                            ...chat,
                            messages: [],
                        },

                        ...prev,

                    ]
                );


                setActiveChat(
                    chat.id
                );


                return;

            }


            /*
             * Usuário normal
             */

            const chat =
                await createChat();


            setChats(
                prev => [

                    {
                        ...chat,
                        messages: [],
                    },

                    ...prev,

                ]
            );


            setActiveChat(
                chat.id
            );

        }

        catch (err) {

            console.error(
                "❌ Erro ao criar chat:",
                err
            );

        }

    }


    /* ===========================
   EXCLUIR CHAT
=========================== */

async function deleteChat(
    chatId
) {

    const currentBetaUser =
        getBetaUser();


    try {

        /* ===========================
           BETA
        =========================== */

        if (currentBetaUser) {

            console.log(
                "🗑️ Excluindo chat Beta:",
                chatId
            );


            await deleteBetaChatAPI(
                chatId
            );


            const updatedChats =
                chats.filter(
                    chat =>
                        chat.id !== chatId
                );


            /*
             * Ainda existem outros chats
             */

            if (
                updatedChats.length > 0
            ) {

                setChats(
                    updatedChats
                );


                /*
                 * Se apagamos o chat ativo,
                 * selecionamos outro.
                 */

                if (
                    activeChat === chatId
                ) {

                    setActiveChat(
                        updatedChats[0].id
                    );

                }

                return;

            }


            /*
             * Não existe mais nenhum chat.
             *
             * Criamos automaticamente
             * um novo chat Beta.
             */

            const newChatData =
                await createBetaChat();


            setChats([

                {
                    ...newChatData,

                    messages: [],

                },

            ]);


            setActiveChat(
                newChatData.id
            );


            console.log(
                "🆕 Novo chat Beta criado:",
                newChatData.id
            );


            return;

        }


        /* ===========================
           USUÁRIO NORMAL
        =========================== */

        await deleteChatAPI(
            chatId
        );


        const updatedChats =
            chats.filter(
                chat =>
                    chat.id !== chatId
            );


        setChats(
            updatedChats
        );


        if (
            activeChat === chatId
        ) {

            if (
                updatedChats.length > 0
            ) {

                setActiveChat(
                    updatedChats[0].id
                );

            }

            else {

                const chat =
                    await createChat();


                setChats([

                    {
                        ...chat,

                        messages: [],

                    },

                ]);


                setActiveChat(
                    chat.id
                );

            }

        }

    }

    catch (err) {

        console.error(
            "❌ Erro ao excluir chat:",
            err
        );

    }

}


    /* ===========================
       DETECTAR PEDIDO DE IMAGEM
    =========================== */

    function isImageRequest(
        text
    ) {

        const lower =
            text
                .toLowerCase()
                .trim();


        return (

            lower.includes(
                "gere uma imagem"
            ) ||

            lower.includes(
                "gere a imagem"
            ) ||

            lower.includes(
                "crie uma imagem"
            ) ||

            lower.includes(
                "crie a imagem"
            ) ||

            lower.includes(
                "faça uma imagem"
            ) ||

            lower.includes(
                "faça a imagem"
            ) ||

            lower.includes(
                "gerar uma imagem"
            ) ||

            lower.includes(
                "gerar a imagem"
            ) ||

            lower.includes(
                "desenhe"
            ) ||

            lower.includes(
                "desenhar"
            )

        );

    }


    /* ===========================
       ENVIAR MENSAGEM
    =========================== */

    async function sendMessage(
        text
    ) {

        if (
            !text?.trim()
        ) {

            return;

        }


        if (loading) {

            return;

        }


        /*
         * PROTEÇÃO PRINCIPAL
         *
         * Impede exatamente o erro:
         *
         * "Nenhum chat ativo."
         */

        if (!activeChat) {

            console.error(
                "❌ Nenhum chat ativo."
            );


            /*
             * Tenta criar um chat automaticamente.
             */

            try {

                if (
                    getBetaUser()
                ) {

                    const chat =
                        await createBetaChat();


                    setChats(
                        prev => [

                            {
                                ...chat,
                                messages: [],
                            },

                            ...prev,

                        ]
                    );


                    setActiveChat(
                        chat.id
                    );


                    /*
                     * A função atual ainda não
                     * possui o novo activeChat.
                     *
                     * Portanto não envia a
                     * mensagem neste ciclo.
                     */

                    return;

                }


                const chat =
                    await createChat();


                setChats(
                    prev => [

                        {
                            ...chat,
                            messages: [],
                        },

                        ...prev,

                    ]
                );


                setActiveChat(
                    chat.id
                );


                return;

            }

            catch (err) {

                console.error(
                    "❌ Não foi possível criar chat:",
                    err
                );

                return;

            }

        }


        /* ===========================
           MENSAGEM DO USUÁRIO
        =========================== */

        const userMessage = {

            role:
                "user",

            type:
                "text",

            text,

        };


        /* ===========================
           MEMÓRIA
        =========================== */

        try {

            const detectedMemory =
                detectMemory(
                    text
                );


            if (detectedMemory) {

                await saveMemory(
                    detectedMemory
                );

            }

        }

        catch (err) {

            console.warn(
                "⚠️ Erro ao salvar memória:",
                err
            );

        }


        /* ===========================
           ADICIONAR USUÁRIO
        =========================== */

        const updatedMessages = [

            ...messages,

            userMessage,

        ];


        updateMessages(
            updatedMessages
        );


        /* ===========================
           ESTADOS
        =========================== */

        setLoading(
            true
        );


        setStatus(
            "thinking"
        );


        const imageRequest =
            isImageRequest(
                text
            );


        setGeneratingImage(
            imageRequest
        );


        try {

            /* ===========================
               ASSISTENTE
            =========================== */

            const assistantMessage = {

                role:
                    "assistant",

                type:
                    "text",

                text:
                    "",

            };


            updateMessages([

                ...updatedMessages,

                assistantMessage,

            ]);


            /*
             * Pegar o Beta novamente
             * para garantir que estamos
             * usando o estado correto.
             */

            const currentBetaUser =
                getBetaUser();


            console.log(
                "========== SEND MESSAGE =========="
            );


            console.log(
                "🆔 Chat:",
                activeChat
            );


            console.log(
                "🧬 Beta:",
                currentBetaUser
            );


            console.log(
                "💬 Mensagem:",
                text
            );


            /* ===========================
               API
            =========================== */

            await sendMessageAPI(

                activeChat,

                text,

                currentBetaUser,


                /* ===========================
                   STREAM TEXTO
                =========================== */

                chunk => {

                    assistantMessage.text +=
                        chunk;


                    updateMessages([

                        ...updatedMessages,

                        {
                            ...assistantMessage,
                        },

                    ]);

                },


                /* ===========================
                   IMAGEM
                =========================== */

                imageData => {

                    console.log(
                        "🖼️ Imagem recebida:",
                        imageData
                    );


                    setGeneratingImage(
                        false
                    );


                    const imageMessage = {

                        role:
                            "assistant",

                        type:
                            "image",

                        text:
                            "",

                        url:
                            imageData.url,

                    };


                    updateMessages([

                        ...updatedMessages,

                        imageMessage,

                    ]);

                }

            );

        }

        catch (err) {

    console.error(
        "❌ Erro ao enviar mensagem:",
        err
    );

    setGeneratingImage(false);

    if (err?.code === "IMAGE_LIMIT") {
        throw err;
    }

    updateMessages([
        ...updatedMessages,
        {
            role: "assistant",
            type: "text",
            text:
                err.message ||
                "Erro ao conectar com a Kyorah.",
        },
    ]);

}

        finally {

            setLoading(
                false
            );


            setGeneratingImage(
                false
            );


            setStatus(
                "idle"
            );

        }

    }


    /* ===========================
       PROVIDER
    =========================== */

    return (

        <ChatContext.Provider

            value={{

                chats,

                activeChat,

                setActiveChat,

                newChat,

                deleteChat,

                messages,

                loading,

                generatingImage,

                status,

                sendMessage,

            }}

        >

            {children}

        </ChatContext.Provider>

    );

}


/* ===========================
   HOOK
=========================== */

export function useChat() {

    return useContext(
        ChatContext
    );

}
