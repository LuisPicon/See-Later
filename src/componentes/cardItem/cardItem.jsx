import GuardarTarjeta from "../guardarTargeta/guardarTargeta";
import useNavigateDetalles from "../../hooks/useNavigateDetalles.jsx";

import { Punto } from "../icons/icons";
import "./cardItem.css";
import { useState } from "react";
const CardItem = ({ image, year, type, title, id, saved }) => {
  const [enBtnSaved, setEnBtnSaved] = useState(false);
  const handleNavigate = useNavigateDetalles();
  const data = {
    image,
    year,
    type,
    title,
    id,
    saved,
  };

  return (
    <div className="card__item position-relative ">
      <figure
        className="m-0 p-0 position-relative"
        onClick={() => handleNavigate(type, id)}
      >
        <img
          className="card__item__img"
          src={image}
          alt={`Poster de ${type}, ${title}`}
        />
        <figure className={`btn__ampliar ${enBtnSaved && "opacity-0"}`}>
          <img
            src="https://img.icons8.com/material/48/FFFFFF/full-screen--v1.png"
            alt=""
          />
        </figure>
      </figure>

      <p>
        {year}
        <Punto />
        {type}
      </p>
      <p className="text-white"> {title}</p>
      <div
        onMouseEnter={() => {
          setEnBtnSaved(true);
        }}
        onMouseLeave={() => {
          setEnBtnSaved(false);
        }}
      >
        <GuardarTarjeta data={data} guardado={saved} />
      </div>
    </div>
  );
};

export default CardItem;
