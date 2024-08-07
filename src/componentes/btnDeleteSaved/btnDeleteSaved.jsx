import { useContext, useState } from "react";
import DataLocaContext from "../../context/contextDataLocal.jsx";
import "./btnDeleteSaved.css";
import { toast } from "sonner";
const BtnDeleteSaved = () => {
  const { deleteGenre, dataLocal, handlePrevDataLocal } =
    useContext(DataLocaContext);
  const [filtro, setFiltro] = useState("All");
  const handleClick = (e) => {
    const valueDelete = e.target.dataset.value;
    setFiltro(valueDelete);
  };
  const messageDeleted = () =>
    toast(`Deleted ${filtro} `, {
      className: "positionConfig",

      action: { label: "Undo", onClick: () => handlePrevDataLocal() },
    });
  const handleDelete = () => {
    deleteGenre(filtro.toLowerCase());
    if (dataLocal.length) {
      messageDeleted();
    } else {
      toast.warning("you don't have local data", {
        className: "positionConfig",
      });
    }
  };
  return (
    <div className="btn-group ">
      <button
        type="button p-0"
        className="btn btn-danger"
        style={{ width: "7.5rem" }}
        onClick={handleDelete}
      >
        Delete {filtro}
      </button>
      <button
        type="button"
        className="btn btn-danger  dropdown-toggle toggle-split btn__open "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden text-white  ">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu">
        <li
          className={`dropdown-item ${filtro == "All" && "filtro--activo "} `}
          data-value="All"
          onClick={handleClick}
        >
          <p>All</p>
        </li>
        <li
          className={`dropdown-item ${
            filtro == "Movies" && "filtro--activo "
          } `}
          data-value="Movies"
          onClick={handleClick}
        >
          <p>Movies</p>
        </li>
        <li
          className={`dropdown-item ${filtro == "Anime" && "filtro--activo "} `}
          data-value="Anime"
          onClick={handleClick}
        >
          <p>Anime</p>
        </li>
        <li
          className={`dropdown-item ${
            filtro == "Series" && "filtro--activo "
          } `}
          data-value="series"
          onClick={handleClick}
        >
          <p>Series</p>
        </li>
      </ul>
    </div>
  );
};

export default BtnDeleteSaved;
