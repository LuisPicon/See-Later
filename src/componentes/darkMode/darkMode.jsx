import { useEffect, useState } from "react";
import { Sun, Moon } from "../icons/icons";

// validar las preferencias del usuario y establecer modo  inicial
const modoInicial = window.matchMedia("(prefers-color-scheme: light)").matches
  ? "light"
  : "dark";

const DarkMode = () => {
  const [modo, setModo] = useState(
    localStorage.getItem("theme") || modoInicial
  );

  useEffect(() => {
    localStorage.setItem("theme", modo);
    document.documentElement.setAttribute("data-bs-theme", modo);
  }, [modo]);

  const handleClick = () => {
    setModo(modo === "dark" ? "light" : "dark");
  };
  return (
    <button
      className="border-0 bg-transparent transition ease-in-out -translate-y-px-hover duration-300 scale-110-hover  "
      onClick={handleClick}
    >
      {modo === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkMode;
