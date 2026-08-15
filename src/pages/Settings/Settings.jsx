import "./Settings.css";

import ProfileCard from "./components/ProfileCard";
import AIModelCard from "./components/AIModelCard";
import ToolsCard from "./components/ToolsCard";
import MemoryCard from "./components/MemoryCard";
import AppearanceCard from "./components/AppearanceCard";


export default function Settings({ onBack }) {

  return (
    <main className="settings-page">

      <header className="settings-title">

  <button
    className="back-button"
    onClick={onBack}
  >
    ← Voltar
  </button>


  <h1>
    ⚙️ Configurações
  </h1>


  <p>
    Personalize sua experiência com a Kyorah.
  </p>

</header>

      <section className="settings-grid">

        <ProfileCard />

        <AIModelCard />

        <ToolsCard />

        <MemoryCard />

        <AppearanceCard />

      </section>


    </main>
  );
}