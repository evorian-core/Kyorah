import { useState } from "react";
import "./Layout.css";

import Sidebar from "../Sidebar/Sidebar";
import SidebarToggle from "../Sidebar/SidebarToggle";

import Home from "../Home/Home";
import Chat from "../Chat/Chat";
import Composer from "../Composer/Composer";

import Settings from "../../pages/Settings/Settings";
import Account from "../../pages/Account/Account";
import Plans from "../../pages/Plans/Plans";

import { useChat } from "../../contexts/ChatContext";

export default function Layout() {

  const { messages } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState("chat");

  return (
    <div className="layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setPage={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }}
      />

      {!sidebarOpen && (
        <SidebarToggle
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* =========================
          CONTEÚDO PRINCIPAL
      ========================= */}

      <main className="main">


        {/* =========================
            CHAT
        ========================= */}

        {currentPage === "chat" && (
          <>
            {messages.length === 0 ? (
              <Home />
            ) : (
              <div className="chat-area">
                <Chat />
              </div>
            )}

            <Composer />
          </>
        )}


        {/* =========================
            CONFIGURAÇÕES
        ========================= */}

        {currentPage === "settings" && (
          <div className="page-content">

            <Settings
              onBack={() => setCurrentPage("chat")}
            />

          </div>
        )}


        {/* =========================
            CONTA
        ========================= */}

        {currentPage === "account" && (
          <div className="page-content">

            <Account
              onBack={() => setCurrentPage("chat")}
            />

          </div>
        )}


        {/* =========================
            MEMBERSHIP
        ========================= */}

        {currentPage === "plans" && (
          <div className="page-content">

            <Plans
              onBack={() => setCurrentPage("chat")}
            />

          </div>
        )}

      </main>

    </div>
  );
}