import { useContext, useEffect, useRef, useState } from "react";
import DataLocalContext from "../../context/contextDataLocal";
import Grid from "../../componentes/grid/grid";
import Filtro from "../../componentes/filtro/filtro";
import BtnDeleteSaved from "../../componentes/btnDeleteSaved/btnDeleteSaved";
import NotData from "../../componentes/notData/notData";
const DATA__FILTROS = [
  {
    name: "Movies",
    id: null,
  },
  {
    name: "Anime",
    id: null,
  },
  {
    name: "Series",
    id: null,
  },
];

const Guardado = () => {
  const { dataLocal } = useContext(DataLocalContext);
  const [dataGuardado, setDataGuardado] = useState(dataLocal);
  const [filtroActual, setFiltroActual] = useState({
    name: "All",
    id: null,
  });
  const isFirsRender = useRef(true);
  useEffect(() => {
    if (!isFirsRender.current) {
      setDataGuardado(dataLocal);
    }
  }, [dataLocal]);

  useEffect(() => {
    if (isFirsRender.current) {
      isFirsRender.current = false;
      return;
    }
    if (filtroActual.name === "All") {
      setDataGuardado(dataLocal);
      return;
    }
    const newData = dataLocal.filter(
      (el) => el.type === filtroActual.name.toLocaleLowerCase()
    );
    setDataGuardado(newData);
  }, [filtroActual, dataLocal]);
  return (
    <main className="container d-flex flex-column gap-5">
      <div className="d-flex  gap-5">
        <Filtro
          filtro={filtroActual}
          setFiltro={setFiltroActual}
          FILTROS={DATA__FILTROS}
        />
        <BtnDeleteSaved />
      </div>
      {dataGuardado.length ? (
        <Grid data={dataGuardado} isLoading={false} />
      ) : (
        <NotData />
      )}
    </main>
  );
};

export default Guardado;
