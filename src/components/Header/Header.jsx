import "./Header.css";

export default function Header() {
  const hour = new Date().getHours();

  let greeting = "Boa noite";

  if (hour >= 5 && hour < 12) greeting = "Bom dia";
  if (hour >= 12 && hour < 18) greeting = "Boa tarde";

  return (
    <header className="header">

      <div className="header-content">

        <span className="greeting">
          {greeting}
        </span>

        <h1>
          Por onde começamos?
        </h1>

      </div>

    </header>
  );
}
