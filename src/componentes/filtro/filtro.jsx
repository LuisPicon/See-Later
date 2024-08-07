import { FlechaAbajo } from "../icons/icons";
import Li from "../li/li.jsx";
import "./filtro.css";

const Filtro = ({ filtro, setFiltro, FILTROS = [] }) => {
  const handleClick = (e) => {
    let value = e.target.dataset.value;
    if (value !== filtro.name) {
      let id = JSON.parse(e.target.dataset.id || null);
      setFiltro({
        name: value,
        id: id,
      });
    }
  };
  return (
    <div id="inicio">
      <button
        type="button"
        className="btn btn-default filtro text-start text-md-center text-white "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter {filtro.name} <FlechaAbajo />
      </button>
      <ul className="dropdown-menu mt-1 lista__filtros">
        <Li filtro={filtro} genero="All" handleClick={handleClick} id="null" />
        {FILTROS.map((el) => (
          <Li
            filtro={filtro}
            genero={el.name}
            handleClick={handleClick}
            id={el.id || el.mal_id}
            key={el.name}
          />
        ))}
      </ul>
    </div>
  );
};

export default Filtro;
