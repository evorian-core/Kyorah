import "./Message.css";
import MarkdownRenderer from "../MarkdownRenderer";

import { useState } from "react";
import ImageViewer from "../ImageViewer/ImageViewer";

import {
  FiCopy,
  FiRefreshCw,
  FiThumbsUp,
  FiThumbsDown,
  FiCheck,
} from "react-icons/fi";

export default function Message({ message }) {
  const isAssistant = message.role === "assistant";

  const [copied, setCopied] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);


  async function handleCopy() {
    if (!message.text) return;

    await navigator.clipboard.writeText(message.text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }


  return (
    <div className={`message ${message.role}`}>

      {isAssistant && (
        <div className="assistant-header">

          <div className="assistant-avatar">
            <img
              src={`${import.meta.env.BASE_URL}favicon.png`}
              alt="Kyorah"
            />
          </div>

          <span>Kyorah</span>

        </div>
      )}


      <div className="message-content">

        {isAssistant ? (

          message.type === "image" ? (

            <img
              src={message.url}
              alt="Imagem gerada pela Kyorah"
              className="generated-image"
              onClick={() => setViewerOpen(true)}
            />

          ) : (

            <MarkdownRenderer>
              {message.text}
            </MarkdownRenderer>

          )

        ) : (

          message.text

        )}

      </div>


      {isAssistant && (

        <div className="message-actions">

          <button
            className="action-button"
            onClick={handleCopy}
            title="Copiar"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>


          <button
            className="action-button"
            title="Regenerar (em breve)"
          >
            <FiRefreshCw />
          </button>


          <button
            className="action-button"
            title="Gostei"
          >
            <FiThumbsUp />
          </button>


          <button
            className="action-button"
            title="Não gostei"
          >
            <FiThumbsDown />
          </button>

        </div>

      )}


      {viewerOpen && message.type === "image" && (

        <ImageViewer
          image={message.url}
          onClose={() => setViewerOpen(false)}
        />

      )}

    </div>
  );
}
