import { useEffect, useRef, useState } from "react";
import Grid from "../../componentes/grid/grid";
import Filtro from "../../componentes/filtro/filtro";
import UseAllData from "../../hooks/useHome/useAllData.jsx";
import UseScrollBottom from "../../hooks/useScrollBottom.jsx";

import useFilter from "../../hooks/useFilter.jsx";
import ErrorInterno from "../../componentes/errorInterno/errorInterno.jsx";

const inicialUrlAnime = "https://api.jikan.moe/v4/top/anime";
const inicialUrlPeliculas =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const inicialUrlSeries =
  "https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

const FILTROS = [
  {
    name: "Action",
    id: {
      anime: 1,
      movies: 28,
      tv: 10759,
    },
  },
  {
    name: "Adventure",
    id: {
      anime: 2,
      movies: 12,
      tv: 10759,
    },
  },
  {
    name: "Comedy",
    id: {
      anime: 4,
      movies: 35,
      tv: 35,
    },
  },
  {
    name: "Drama",
    id: {
      anime: 8,
      movies: 18,
      tv: 18,
    },
  },
  {
    name: "Family",
    id: {
      anime: 15,
      movies: 10751,
      tv: 10751,
    },
  },
  {
    name: "Fantasy",
    id: {
      anime: 10,
      movies: 14,
      tv: 10765,
    },
  },
  {
    name: "Horror",
    id: {
      anime: 14,
      movies: 27,
      tv: null,
    },
  },
  {
    name: "Mystery",
    id: {
      anime: 7,
      movies: 9648,
      tv: 9648,
    },
  },
  {
    name: "Science Fiction",
    id: {
      anime: 24,
      movies: 878,
      tv: 10765,
    },
  },
  {
    name: "War",
    id: {
      anime: 38,
      movies: 10752,
      tv: 10768,
    },
  },
];

const Inicio = () => {
  const [urlAnime, setUrlAnime] = useState(inicialUrlAnime);
  const [urlPeliculas, setUrlPeliculas] = useState(inicialUrlPeliculas);
  const [urlSeries, setUrlSeries] = useState(inicialUrlSeries);
  const [filtro, setFiltro] = useState({
    name: "All",
    id: {
      anime: null,
      movies: null,
      tv: null,
    },
  });
  const numPaginaAnime = useRef(26);
  const numPaginaTvMovies = useRef(2);
  const {
    data,
    setData,
    paginarAnimeTvMovies,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = UseAllData(
    urlAnime,
    urlPeliculas,
    urlSeries,
    numPaginaAnime,
    numPaginaTvMovies
  );

  useFilter({
    urlAnime,
    urlPeliculas,
    urlSeries,
    numPaginaAnime,
    numPaginaTvMovies,
    setData,
    setIsLoading,
    setError,
  });
  UseScrollBottom(paginarAnimeTvMovies, isLoading);

  useEffect(() => {
    if (filtro.name === "All") {
      setUrlAnime(inicialUrlAnime);
      setUrlPeliculas(inicialUrlPeliculas);
      setUrlSeries(inicialUrlSeries);
    } else {
      let urlFiltroAnime = `https://api.jikan.moe/v4/anime?genres=${filtro.id.anime}`;
      let urlFiltroPeliculas = `${inicialUrlPeliculas}&with_genres=${filtro.id.movies}`;
      let urlFiltroSeries = `${inicialUrlSeries}&with_genres=${filtro.id.tv}`;
      setUrlAnime(urlFiltroAnime);
      setUrlPeliculas(urlFiltroPeliculas);
      setUrlSeries(urlFiltroSeries);
    }
  }, [filtro]);
  return (
    <>
      {error ? (
        <ErrorInterno ruta="" error={error} />
      ) : (
        <main className="container d-flex flex-column gap-5">
          <Filtro filtro={filtro} setFiltro={setFiltro} FILTROS={FILTROS} />
          <Grid data={data} isLoading={isLoading} />
        </main>
      )}
    </>
  );
};

export default Inicio;
