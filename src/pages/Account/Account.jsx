import "./Account.css";

import { useEffect, useState } from "react";


export default function Account({ onBack }) {

  const [user, setUser] = useState(() => {

    // =========================
    // BETA USER
    // =========================

    const betaSaved =
      sessionStorage.getItem("kyorah_beta_user");

    if (betaSaved) {

      try {

        const betaUser =
          JSON.parse(betaSaved);

        return {
          name: betaUser.name,
          created: new Date().toLocaleDateString("pt-BR"),
        };

      } catch {

        // Se houver erro,
        // continua para a conta local.

      }

    }


    // =========================
    // USUÁRIO LOCAL
    // =========================

    const saved =
      localStorage.getItem("kyorah_user");

    if (saved) {

      try {

        return JSON.parse(saved);

      } catch {

        // Continua para o usuário padrão.

      }

    }


    // =========================
    // USUÁRIO PADRÃO
    // =========================

    return {
      name: "Usuário Kyorah",
      created: new Date().toLocaleDateString("pt-BR"),
    };

  });


  // =========================
  // SALVAR CONTA LOCAL
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "kyorah_user",
      JSON.stringify(user)
    );

  }, [user]);


  // =========================
  // VERIFICAR SE É BETA
  // =========================

  const isBeta =
    Boolean(
      sessionStorage.getItem(
        "kyorah_beta_user"
      )
    );


  // =========================
  // EDITAR NOME
  // =========================

  function editName() {

    const name = prompt(
      "Qual seu nome?"
    );

    if (!name) return;


    setUser({
      ...user,
      name,
    });

  }


  return (

    <section className="account">


      {/* =========================
          VOLTAR
      ========================= */}

      <button
        className="account-back"
        onClick={onBack}
      >
        ← Voltar
      </button>


      {/* =========================
          CABEÇALHO
      ========================= */}

      <header>

        <h1>
          👤 Conta
        </h1>

        <p>
          Gerencie seu perfil local da Kyorah.
        </p>

      </header>


      {/* =========================
          CARD DA CONTA
      ========================= */}

      <div className="account-card">


        {/* AVATAR */}

        <div className="avatar">

          {user.name.charAt(0).toUpperCase()}

        </div>


        {/* NOME */}

        <h2>
          {user.name}
        </h2>


        {/* TIPO DA CONTA */}

        <span>

          {isBeta
            ? "Kyorah Beta"
            : "Conta local Kyorah"
          }

        </span>


        {/* DATA */}

        <p>
          Criada em: {user.created}
        </p>


        {/* =========================
            EDITAR NOME
        ========================= */}

        {!isBeta && (

          <button
            onClick={editName}
          >
            Editar nome
          </button>

        )}


        {/* =========================
            IDENTIFICAÇÃO BETA
        ========================= */}

        {isBeta && (() => {

          try {

            const betaUser =
              JSON.parse(
                sessionStorage.getItem(
                  "kyorah_beta_user"
                )
              );

            return (

              <div className="beta-account-info">

                <span>
                  {betaUser.betaId}
                </span>

              </div>

            );

          } catch {

            return null;

          }

        })()}


      </div>


    </section>

  );

}
