import useNavigateDetalles from "../../hooks/useNavigateDetalles";

import "./cardRelacionados.css";

const CardRelacionados = ({ typo, id, img, title }) => {
  const handleNavigate = useNavigateDetalles();

  return (
    <div
      data-value={id}
      className="card__relacionados"
      onClick={() => handleNavigate(typo, id)}
    >
      <figure className="card__relacionados__figure">
        <img src={img} alt="" className="card__relacionados__img" />
      </figure>
      <p>{title}</p>
    </div>
  );
};

export default CardRelacionados;
