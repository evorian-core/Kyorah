import "./ResponseReveal.css";

export default function ResponseReveal({ children }) {
  return (
    <div className="response-reveal">
      <div className="response-content">
        {children}
      </div>

      <div className="response-light"></div>
    </div>
  );
}