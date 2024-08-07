import { useRef } from "react";
import Filtro from "../../componentes/filtro/filtro";
import Grid from "../../componentes/grid/grid";
import UseScrollBottom from "../../hooks/useScrollBottom.jsx";
import ErrorInterno from "../../componentes/errorInterno/errorInterno";
import useGetSeries from "../../hooks/useSeries/useGetSeries.jsx";

const Series = () => {
  const numPaginaSeries = useRef(2);
  const isFistRender = useRef(true);
  const [
    data,
    isLoading,
    error,
    dataFiltros,
    filtroActual,
    setFiltroActual,
    paginarSeries,
  ] = useGetSeries({ isFistRender, numPaginaSeries });

  UseScrollBottom(paginarSeries, isLoading);
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

export default Series;
