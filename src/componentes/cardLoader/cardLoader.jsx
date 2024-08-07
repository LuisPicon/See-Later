import "./cardLoader.css";
const CardLoader = () => {
  return (
    <div className="col placeholder-glow">
      <span
        className="placeholder col-12 rounded "
        style={{ height: "300px" }}
      ></span>
      <span className="placeholder col-12 mt-2"></span>
      <span className="placeholder col-7 mt-2"></span>
    </div>
  );
};

export default CardLoader;
