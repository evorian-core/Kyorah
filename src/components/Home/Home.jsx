import "./Home.css";

export default function Home() {

  const betaUser = (() => {

    try {

      const saved =
        sessionStorage.getItem("kyorah_beta_user");

      return saved
        ? JSON.parse(saved)
        : null;

    } catch {

      return null;

    }

  })();


  const hour = new Date().getHours();

  let greeting = "Boa noite";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  }

  if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  }


  return (

    <section className="home fade-in">

      <div className="home-glow"></div>


      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt="Kyorah"
        className="home-logo float"
      />


      <span className="home-greeting">

        {betaUser?.name || greeting}

      </span>


      <h1>

        Por onde

        <br />

        <span className="gradient-text">

          começamos?

        </span>

      </h1>


      <p>

        Aprendendo com você.
        Evoluindo com você.

      </p>

    </section>

  );

}
