import "./Landing.css";

import { useNavigate } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();

  return (

    <div className="landing">


      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="hero-glow"></div>


        <div className="hero-content">

          <img
            src="/favicon.png"
            alt="Kyorah"
            className="hero-logo"
          />


          <span className="hero-badge">
            OMNIA • EVORIAN
          </span>


          <h1>

            Conheça a

            <span> Kyorah</span>

          </h1>


          <p>

            Uma Inteligência Artificial criada para
            conversar, pesquisar, gerar imagens,
            lembrar informações importantes e ajudar
            você todos os dias.

          </p>


          {/* =========================
              BOTÕES PRINCIPAIS
          ========================= */}

          <div className="hero-buttons">

            <button
              className="primary"
              onClick={() =>
                navigate("/register")
              }
            >
              Começar gratuitamente
            </button>


            <button
              className="secondary"
              onClick={() =>
                navigate("/login")
              }
            >
              Fazer Login
            </button>

          </div>


          {/* =========================
              BETA ACCESS
          ========================= */}

          <div
            className="beta-landing-card"
            onClick={() =>
              navigate("/beta")
            }
          >

            <div className="beta-landing-top">

              <span className="beta-status-dot">
                ●
              </span>

              <span className="beta-landing-label">
                BETA ACCESS
              </span>

              <span className="beta-landing-version">
                00X
              </span>

            </div>


            <h3>
              Você recebeu acesso antecipado.
            </h3>


            <p>
              Entre na experiência demonstrativa
              exclusiva da Kyorah.
            </p>


            <div className="beta-landing-bottom">

              <span>
                07 acessos disponíveis
              </span>

              <strong>
                ENTRAR NO BETA →
              </strong>

            </div>

          </div>


        </div>

      </section>



      {/* =========================
          RECURSOS
      ========================= */}

      <section className="features">

        <h2>
          O que a Kyorah pode fazer?
        </h2>


        <div className="features-grid">


          <div className="feature-card">

            <h3>
              🧠 Inteligência
            </h3>

            <p>
              Respostas rápidas, explicações,
              programação e auxílio nos estudos.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              🎨 Imagens
            </h3>

            <p>
              Gere imagens usando inteligência
              artificial em poucos segundos.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              🌐 Pesquisa
            </h3>

            <p>
              Quando necessário, pesquisa na internet
              para fornecer informações atualizadas.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              🧠 Memória
            </h3>

            <p>
              Lembra informações importantes para
              tornar as conversas mais naturais.
            </p>

          </div>


        </div>

      </section>



      {/* =========================
          MEMBERSHIP
      ========================= */}

      <section className="membership">

        <h2>
          Kyorah Membership
        </h2>


        <p>
          Escolha o plano ideal para você.
        </p>


        <div className="membership-cards">


          <div className="membership-card">

            <h3>
              Free
            </h3>

            <span>
              Grátis
            </span>

            <p>
              Ideal para começar.
            </p>

          </div>


          <div className="membership-card featured">

            <h3>
              Basic
            </h3>

            <span>
              R$ 9,90
            </span>

            <p>
              Mais mensagens e imagens.
            </p>

          </div>


          <div className="membership-card">

            <h3>
              Pro
            </h3>

            <span>
              R$ 19,90
            </span>

            <p>
              A melhor experiência da Kyorah.
            </p>

          </div>


        </div>

      </section>



      {/* =========================
          RODAPÉ
      ========================= */}

      <footer>

        <img
          src="/favicon.png"
          alt="Kyorah"
        />


        <p>
          © 2026 EVORIAN • OMNIA
        </p>

      </footer>


    </div>

  );

}