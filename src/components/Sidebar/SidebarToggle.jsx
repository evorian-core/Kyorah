import "./SidebarToggle.css";
import { FiMenu } from "react-icons/fi";

export default function SidebarToggle({ onClick }) {
  return (
    <button
      className="sidebar-toggle"
      onClick={onClick}
      aria-label="Abrir menu"
    >
      <FiMenu />
    </button>
  );
}
