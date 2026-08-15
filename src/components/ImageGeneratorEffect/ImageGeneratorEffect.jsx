import "./ImageGeneratorEffect.css";
import { useEffect, useState } from "react";

const stages = [
  "Criando base...",
  "Definindo composição...",
  "Desenhando...",
  "Ajustando iluminação...",
  "Aplicando cores...",
  "Dando alguns retoques...",
  "Quase pronto..."
];

export default function ImageGeneratorEffect() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) =>
        prev < stages.length - 1 ? prev + 1 : prev
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-generator-overlay">

      <div className="generator-card">

        <p className="generator-title">
          {stages[stage]}
        </p>

        <div className="generator-preview">

          <div className="gradient-bg"></div>

          <div className="light-sweep"></div>

          <div className="grid"></div>

          <div className="particles"></div>

        </div>

        <span className="generator-subtitle">
          Isso pode levar alguns segundos...
        </span>

      </div>

    </div>
  );
}