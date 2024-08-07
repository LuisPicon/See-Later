import Menu from "../menu/menu";
import IconBuscador from "../iconBuscador/iconBuscador";
import DarkMode from "../darkMode/darkMode";

import "./cabecera.css";
const Cabecera = () => {
  return (
    <header className="container p-3 sticky-top  w-100  cabecera z-1">
      <div className="d-flex justify-content-between align-items-center">
        <Menu />
        <div className="d-flex gap-4 cabecera__herramientas">
          <IconBuscador />
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default Cabecera;
