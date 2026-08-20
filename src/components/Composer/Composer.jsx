import { useEffect, useRef, useState } from "react";
import "./Composer.css";
import {
  FiArrowUp,
  FiPaperclip,
} from "react-icons/fi";

import { useChat } from "../../contexts/ChatContext";

export default function Composer() {

  const [text, setText] = useState("");

  const [imageLimitVisible, setImageLimitVisible] =
    useState(false);

  const textareaRef = useRef(null);

  const fileInputRef = useRef(null);

  const {
    sendMessage,
    loading,
  } = useChat();


  /* ===========================
     AJUSTAR ALTURA DO TEXTAREA
  =========================== */

  useEffect(() => {

    const textarea =
      textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    textarea.style.height =
      `${textarea.scrollHeight}px`;

  }, [text]);


  /* ===========================
     ENVIAR MENSAGEM
  =========================== */

  async function handleSend() {

    if (
      !text.trim() ||
      loading
    ) {
      return;
    }


    const message =
      text.trim();


    setText("");


    if (textareaRef.current) {

      textareaRef.current.style.height =
        "auto";

    }


    try {

      await sendMessage(
        message
      );

    }

    catch (err) {

      console.error(
        "Erro ao enviar mensagem:",
        err
      );


      /*
       * LIMITE DE IMAGENS
       */

      if (
        err?.code ===
        "IMAGE_LIMIT"
      ) {

        setImageLimitVisible(
          true
        );

        return;

      }

    }

  }


  /* ===========================
     TECLADO
  =========================== */

  function handleKeyDown(e) {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();

    }

  }


  /* ===========================
     ARQUIVO
  =========================== */

  function handleFileSelect(e) {

    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    if (
      file.type.startsWith(
        "image/"
      )
    ) {

      console.log(
        "Imagem selecionada:",
        file
      );

      // Próximo sprint:
      // sendImage(file)

    }

    else if (
      file.type ===
      "application/pdf"
    ) {

      alert(
        "Leitura de PDF chegará em breve. 💜"
      );

    }


    e.target.value = "";

  }


  /* ===========================
     INTERFACE
  =========================== */

  return (

    <div className="composer-wrapper">


      {/* ==================================
          POPUP — LIMITE DE IMAGENS
      ================================== */}

      {imageLimitVisible && (

        <div className="image-limit-popup">

          <div className="image-limit-content">


            <div className="image-limit-icon">
              🖼️
            </div>


            <div className="image-limit-text">

              <strong>
                Limite de geração de imagens atingido
              </strong>


              <p>
                Você atingiu o limite de gerações de imagem
                disponível durante o{" "}
                <strong>
                  Kyorah Beta
                </strong>.
              </p>


              <p>
                Isso faz parte das limitações desta fase
                de testes e não significa que há um
                problema com sua conta.
              </p>


              <p>
                Aguarde até que o limite seja renovado
                para tentar gerar novas imagens.
              </p>


              <span>
                Kyorah Beta — em constante evolução. 💙
              </span>

            </div>


            <button
              className="image-limit-close"
              onClick={() =>
                setImageLimitVisible(false)
              }
              aria-label="Fechar aviso"
              title="Fechar"
            >
              ×
            </button>

          </div>

        </div>

      )}


      {/* ==================================
          COMPOSER
      ================================== */}

      <div className="composer">


        {/* ANEXAR */}

        <button
          className="icon-button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          type="button"
          title="Anexar arquivo"
        >

          <FiPaperclip />

        </button>


        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          hidden
          onChange={handleFileSelect}
        />


        {/* TEXTAREA */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          placeholder={
            loading
              ? "A Kyorah está pensando..."
              : "O que vamos criar hoje?"
          }
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />


        {/* ENVIAR */}

        <button
          className={`send-button ${
            loading
              ? "loading"
              : ""
          }`}
          onClick={handleSend}
          disabled={
            !text.trim() ||
            loading
          }
          type="button"
          title="Enviar"
        >

          {loading ? (

            <div className="button-spinner" />

          ) : (

            <FiArrowUp />

          )}

        </button>


      </div>

    </div>

  );

}
