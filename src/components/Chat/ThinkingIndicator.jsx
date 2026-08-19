import "./ThinkingIndicator.css";

export default function ThinkingIndicator() {
  return (
    <div className="thinking-message">

      <div className="assistant-header">
        <div className="assistant-avatar">
          <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="Kyorah" />
        </div>

        <span>Kyorah</span>
      </div>

      <div className="message-content thinking-box">
        <div className="kyorah-loader">
          <div className="loader-core"></div>
          <div className="loader-ring"></div>
        </div>
      </div>

    </div>
  );
}
