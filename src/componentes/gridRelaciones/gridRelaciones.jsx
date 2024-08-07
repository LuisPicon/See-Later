import CardRelacionados from "../cardRelacionados/cardRelacionados";

const GridRelaciones = ({ dataRelaciones }) => {
  console.log(dataRelaciones[0]);
  return (
    <div className="grid__detalles__relacionados d-flex flex-column">
      <h5 className="text-title">Related:</h5>
      <div className="d-flex flex-wrap gap-5">
        {dataRelaciones.map((el) => (
          <CardRelacionados
            key={el.id}
            typo={el.typo}
            id={el.id}
            img={el.img}
            title={el.title}
          />
        ))}
      </div>
    </div>
  );
};

export default GridRelaciones;
