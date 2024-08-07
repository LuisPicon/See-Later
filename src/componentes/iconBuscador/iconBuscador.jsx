import { useState } from "react";
import { IconSearch } from "../icons/icons";
import Modal from "../modal/modal";
import Buscador from "../../componentes/buscador/buscador.jsx";
const IconBuscador = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      <figure
        onClick={handleClick}
        className="m-0 transition ease-in-out -translate-y-px-hover duration-300 scale-110-hover"
      >
        <IconSearch />
      </figure>
      <Modal open={open} handleClick={handleClick}>
        <Buscador
          stopPropagation={stopPropagation}
          handleClick={handleClick}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};

export default IconBuscador;
