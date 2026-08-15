
import "./Chat.css";

import Message from "../Message/Message";
import ThinkingIndicator from "./ThinkingIndicator";

import { useChat } from "../../contexts/ChatContext";
import { useEffect, useRef } from "react";

import ImageGeneratorEffect
    from "../ImageGeneratorEffect/ImageGeneratorEffect";


export default function Chat() {

    const {
        messages,
        loading,
        generatingImage,
    } = useChat();


    const lastMessage =
        messages[messages.length - 1];


    /*
    ========================================
    PENSAMENTO DA KYORAH
    ========================================

    Só aparece quando:

    - está carregando
    - NÃO está gerando imagem
    - ainda não existe resposta da Kyorah
    */

    const showThinking =
        loading &&
        !generatingImage &&
        (
            !lastMessage ||
            lastMessage.role !== "assistant" ||
            (lastMessage.text ?? "").length === 0
        );


    const messagesEndRef =
        useRef(null);


    /*
    ========================================
    SCROLL AUTOMÁTICO
    ========================================
    */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [
        messages,
        loading,
        generatingImage,
    ]);


    return (

        <section className="chat">


            {/*
            ========================================
            ÁREA DAS MENSAGENS
            ========================================
            */}

            <div className="messages">


                {messages.map(
                    (message, index) => (

                        <Message
                            key={index}
                            message={message}
                        />

                    )
                )}


                {/*
                ========================================
                KYORAH PENSANDO
                ========================================
                */}

                {showThinking && (
                    <ThinkingIndicator />
                )}


                <div
                    ref={messagesEndRef}
                />


            </div>


            {/*
            ========================================
            GERAÇÃO DE IMAGEM
            ========================================
            */}

            {generatingImage && (
                <ImageGeneratorEffect />
            )}


        </section>

    );

}
