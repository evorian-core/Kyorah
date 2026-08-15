import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BetaAccess.css";

const BETA_USERS = {
  1: {
    name: "Ana Paula Orlovski",
    code: "Q4V9_x2K",
  },

  2: {
    name: "Emanueli",
    code: "N7A1_z8P",
  },

  3: {
    name: "Isadora Portela",
    code: "J7M5_xx0",
  },

  4: {
    name: "João Lucas Ribeiro",
    code: "K2R8_v1Q",
  },

  5: {
    name: "Letícia Mariele Vandoski",
    code: "X9F3_m7A",
  },

  6: {
    name: "Nicoli Denck Camargo",
    code: "P5L1_q8Z",
  },

  7: {
    name: "Valéria Palhano",
    code: "V3T6_n2R",
  },
};

export default function BetaAccess() {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [stage, setStage] = useState("input");
  const [displayCode, setDisplayCode] = useState("");

  const user = BETA_USERS[number];

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) return;

    setStage("decrypting");

    const original = `BETA-00${number}`;
    const target = user.code;

    let progress = 0;

    const interval = setInterval(() => {
      progress++;

      let result = "";

      for (let i = 0; i < target.length; i++) {
        if (i < progress) {
          result += target[i];
        } else {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_x";

          result +=
            chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayCode(result);

      if (progress >= target.length + 5) {
        clearInterval(interval);

        setTimeout(() => {
          setStage("verified");

          setTimeout(() => {
            const betaUser = {
              name: user.name,
              betaId: `Beta-00${number}`,
              code: user.code,
            };

            sessionStorage.setItem(
              "kyorah_beta_user",
              JSON.stringify(betaUser)
            );

            navigate("/");
          }, 1800);
        }, 500);
      }
    }, 90);

    setDisplayCode(original);
  }

  if (stage === "input") {
    return (
      <div className="beta-access">
        <div className="beta-glow" />

        <div className="beta-content">
          <div className="beta-brand">
            KYORAH
          </div>

          <div className="beta-label">
            BETA ACCESS
          </div>

          <form onSubmit={handleSubmit}>
            <div className="beta-input-wrapper">
              <span>Beta-00</span>

              <input
                autoFocus
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={number}
                onChange={(e) =>
                  setNumber(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                aria-label="Número do Beta"
              />
            </div>

            <button
              type="submit"
              disabled={!user}
            >
              CONNECT
            </button>
          </form>

          <p className="beta-status">
            Aguardando identificação...
          </p>
        </div>
      </div>
    );
  }

  if (stage === "decrypting") {
    return (
      <div className="beta-access beta-processing">
        <div className="scan-line" />

        <div className="terminal">
          <div className="terminal-line">
            &gt; KYORAH_IDENTITY_PROTOCOL
          </div>

          <div className="terminal-line">
            &gt; ACCESS CODE ACCEPTED
          </div>

          <div className="terminal-line">
            &gt; RESOLVING IDENTITY...
          </div>

          <div className="encrypted-code">
            {displayCode}
          </div>

          <div className="terminal-line muted">
            &gt; DECRYPTING BETA-00{number}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="beta-access beta-verified">
      <div className="verified-ring" />

      <div className="verified-content">
        <div className="verified-status">
          IDENTITY VERIFIED
        </div>

        <h1>{user.name}</h1>

        <span>BETA-00{number}</span>
      </div>
    </div>
  );
}