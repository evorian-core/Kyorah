
import "./Sidebar.css";

import { useState } from "react";

import {
    FiPlus,
    FiMessageSquare,
    FiSettings,
    FiX,
    FiUser,
    FiMoreHorizontal,
    FiTrash2,
} from "react-icons/fi";

import { PiCrownSimpleFill } from "react-icons/pi";

import { useChat } from "../../contexts/ChatContext";

export default function Sidebar({
    isOpen,
    onClose,
    setPage,
}) {
    const {
        chats,
        activeChat,
        setActiveChat,
        newChat,
        deleteChat,
    } = useChat();

    const [menuOpen, setMenuOpen] = useState(null);

    function handleNewChat() {
        newChat();

        if (window.innerWidth <= 768) {
            onClose?.();
        }
    }

    function handleSelectChat(chatId) {
        setActiveChat(chatId);

        if (window.innerWidth <= 768) {
            onClose?.();
        }
    }

    async function handleDelete(chatId) {
        const confirmDelete = window.confirm(
            "Deseja excluir esta conversa?"
        );

        if (!confirmDelete) return;

        await deleteChat(chatId);

        setMenuOpen(null);
    }

    return (
        <aside
            className={`sidebar ${isOpen ? "open" : ""}`}
        >
            <button
                className="close-sidebar"
                onClick={onClose}
                aria-label="Fechar menu"
            >
                <FiX />
            </button>

            <div>
                <div className="sidebar-logo">
                    <div className="logo-box">
                        <img
                            src="/favicon.png"
                            alt="Kyorah"
                        />
                    </div>

                    <div>
                        <h1>Kyorah</h1>
                        <span>OMNIA | EVORIAN</span>
                    </div>
                </div>

                <button
                    className="new-chat"
                    onClick={handleNewChat}
                >
                    <FiPlus />
                    <span>Nova conversa</span>
                </button>

                <div className="chat-history">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`history ${
                                activeChat === chat.id
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <button
                                className="history-main"
                                onClick={() =>
                                    handleSelectChat(chat.id)
                                }
                            >
                                <FiMessageSquare />

                                <span>
                                    {chat.title}
                                </span>
                            </button>

                            <button
                                className="history-menu"
                                onClick={() =>
                                    setMenuOpen(
                                        menuOpen === chat.id
                                            ? null
                                            : chat.id
                                    )
                                }
                                aria-label="Opções da conversa"
                            >
                                <FiMoreHorizontal />
                            </button>

                            {menuOpen === chat.id && (
                                <div className="history-dropdown">
                                    <button
                                        onClick={() =>
                                            handleDelete(chat.id)
                                        }
                                    >
                                        <FiTrash2 />

                                        <span>
                                            Excluir conversa
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-footer">
                <button
                    className="settings"
                    onClick={() => setPage("account")}
                >
                    <FiUser />
                    <span>Conta</span>
                </button>

                <button
                    className="settings"
                    onClick={() => setPage("plans")}
                >
                    <PiCrownSimpleFill />
                    <span>Membership</span>
                </button>

                <button
                    className="settings"
                    onClick={() => setPage("settings")}
                >
                    <FiSettings />
                    <span>Configurações</span>
                </button>
            </div>
        </aside>
    );
}
