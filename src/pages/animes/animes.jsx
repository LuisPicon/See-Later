import { useRef } from "react";
import Filtro from "../../componentes/filtro/filtro";
import Grid from "../../componentes/grid/grid";
import UseScrollBottom from "../../hooks/useScrollBottom.jsx";
import UseGetAnime from "../../hooks/useAnime/useGetAnime";
import ErrorInterno from "../../componentes/errorInterno/errorInterno";

const Anime = () => {
  const isFirstRender = useRef(true);
  const numPaginaAnime = useRef(26);
  const [
    data,
    isLoading,
    error,
    dataFiltros,
    filtroActual,
    setFiltroActual,
    paginarAnime,
  ] = UseGetAnime({ isFirstRender, numPaginaAnime });

  UseScrollBottom(paginarAnime, isLoading);

  return (
    <main className="container d-flex flex-column gap-5">
      <Filtro
        filtro={filtroActual}
        setFiltro={setFiltroActual}
        FILTROS={dataFiltros}
      />
      <Grid data={data} isLoading={isLoading} error={error} />
      {error && <ErrorInterno ruta="" error={error} />}
    </main>
  );
};

export default Anime;
