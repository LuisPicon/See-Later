import "./li.css";
const Li = ({ filtro, genero, handleClick, id }) => {
  return (
    <li
      className={`dropdown-item ${
        filtro.name === genero && "filtro--activo "
      } `}
      data-value={genero}
      data-id={JSON.stringify(id)}
      onClick={handleClick}
    >
      <p className="">{genero}</p>
    </li>
  );
};

export default Li;
