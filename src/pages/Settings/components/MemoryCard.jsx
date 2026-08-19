import { useState, useEffect } from "react";

export default function MemoryCard() {

  const [memories, setMemories] = useState([]);

  useEffect(() => {

    const saved = localStorage.getItem("kyorah_memory");

    if (saved) {
      setMemories(JSON.parse(saved));
    }

  }, []);


  function clearMemory() {

    if (!confirm("Deseja apagar todas as memórias da Kyorah?")) {
      return;
    }

    localStorage.removeItem("kyorah_memory");
    setMemories([]);

  }


  return (

    <div className="settings-card">

      <h2>🧠 Memória</h2>

      <p>
        A Kyorah utiliza memória local neste dispositivo.
      </p>

      <div className="memory-info">

        <div className="memory-row">
          <span>Status</span>
          <strong>Ativada</strong>
        </div>

        <div className="memory-row">
          <span>Memórias salvas</span>
          <strong>{memories.length}</strong>
        </div>

        <div className="memory-row">
          <span>Armazenamento</span>
          <strong>Local</strong>
        </div>

      </div>

      <button
        className="memory-button danger"
        onClick={clearMemory}
      >
        🗑 Limpar memória
      </button>

    </div>

  );

}
