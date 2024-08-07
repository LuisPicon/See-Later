import BtnAtras from "../btnAtras/btnAtras";
import Detalles from "../detalles/detalles";
import GuardarTarjeta from "../guardarTargeta/guardarTargeta";

const GridDetalles = ({ data }) => {
  const { image, title, description, genres, structure, saved } = data;
  return (
    <div className="grid__detalles">
      <BtnAtras />
      <figure className="grid__detalles__figure position-relative">
        <img
          src={image}
          className="grid__detalles__img "
          alt={`image of ${title}`}
        />
        <GuardarTarjeta guardado={saved} data={data} />
      </figure>
      <div className="grid__detalles__info">
        <h5 className="text-title">{title}</h5>
        <p className="grid__detalles__p">{description}</p>
        <h5 className="text-title mt-3">Genres:</h5>
        {genres && genres.join(", ")}
        <h5 className="text-title mt-3">Details:</h5>
        {structure && <Detalles detalles={structure} />}
      </div>
    </div>
  );
};

export default GridDetalles;
