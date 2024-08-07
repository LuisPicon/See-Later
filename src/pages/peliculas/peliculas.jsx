import { useRef } from "react";
import Filtro from "../../componentes/filtro/filtro";
import Grid from "../../componentes/grid/grid";
import UseScrollBottom from "../../hooks/useScrollBottom";
import ErrorInterno from "../../componentes/errorInterno/errorInterno";
import UseGetMovies from "../../hooks/useMovies/useGetMovies";

const Peliculas = () => {
  const isFistRender = useRef(true);
  const numPaginaMovies = useRef(2);
  const [
    data,
    isLoading,
    error,
    dataFiltros,
    filtroActual,
    setFiltroActual,
    paginarMovies,
  ] = UseGetMovies({ isFistRender, numPaginaMovies });

  //scroll infinito
  UseScrollBottom(paginarMovies, isLoading);

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

export default Peliculas;
