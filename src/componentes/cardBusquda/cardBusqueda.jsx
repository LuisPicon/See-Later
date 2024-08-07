import useNavigateDetalles from "../../hooks/useNavigateDetalles.jsx";
import "./style.css";
const bgTypeColors = {
  anime: "#01BCF3",
  movies: "#FD3246",
  series: "#FF7E00",
};
const CardBusqueda = ({ img, title, id, type, setOpen }) => {
  const navigateDetalles = useNavigateDetalles();
  const handleClick = () => {
    navigateDetalles(type, id);
    setOpen(false);
  };
  return (
    <div
      className="d-flex gap-2 cardBusqueda "
      data-id={id}
      style={{ "--color": bgTypeColors[type] }}
      onClick={handleClick}
    >
      <img
        className="cardBusqueda__img rounded h "
        src={img}
        alt="Imagen de Busqueda indexada "
      />
      <div className="d-flex flex-column">
        <p className="cardBusqueda__titulo">{title}</p>
        <span className="cardBusqueda__type">{type}</span>
      </div>
    </div>
  );
};

export default CardBusqueda;
