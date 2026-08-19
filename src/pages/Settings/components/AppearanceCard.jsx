import { useAI } from "../../../providers/AIProvider";

export default function AppearanceCard() {

  const { aiConfig, updateAIConfig } = useAI();

  const appearance = aiConfig.appearance || {
    theme: "dark",
    accent: "#2D5BFF",
    halo: true,
    blur: true,
    streaming: true,
  };

  function update(key, value) {

  updateAIConfig({
    appearance: {
      ...appearance,
      [key]: value,
    },
  });

  if (key === "accent") {

    document.documentElement.style.setProperty(
      "--accent",
      value
    );

  }

}

  return (
    <div className="settings-card">

      <h2>🎨 Aparência</h2>

      <p>Personalize a interface da Kyorah.</p>

      <div className="appearance-group">

        <h3>Tema</h3>

        <div className="theme-buttons">

          <button
            className={appearance.theme === "dark" ? "active" : ""}
            onClick={() => update("theme", "dark")}
          >
            🌙 Escuro
          </button>

          <button
            className={appearance.theme === "light" ? "active" : ""}
            onClick={() => update("theme", "light")}
          >
            ☀️ Claro
          </button>

        </div>

      </div>

      <div className="appearance-group">

        <h3>Cor principal</h3>

        <div className="color-picker">

          <button
            style={{ background:"#2D5BFF" }}
            onClick={() => update("accent","#2D5BFF")}
          />

          <button
            style={{ background:"#8B5CF6" }}
            onClick={() => update("accent","#8B5CF6")}
          />

          <button
            style={{ background:"#10B981" }}
            onClick={() => update("accent","#10B981")}
          />

          <button
            style={{ background:"#F97316" }}
            onClick={() => update("accent","#F97316")}
          />

        </div>

      </div>

    </div>
  );

}
