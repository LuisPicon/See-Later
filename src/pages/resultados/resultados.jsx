import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import getAllData from "../../helpers/getAllData.js";
import mesclarDatos from "../../helpers/mesclarDatos.js";
import Grid from "../../componentes/grid/grid.jsx";
import UseScrollBottom from "../../hooks/useScrollBottom.jsx";
import rutaPaginar from "../../helpers/rutaPaginar.js";
import SinResultados from "../../componentes/sinResultados/sinResultados.jsx";

const Resultados = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sinResultados, setSinResultados] = useState(false);

  const { query } = useParams();
  const numPaginaAnime = useRef(26);
  const numPaginaTvMovies = useRef(2);

  const URL__ANIME = useRef();
  const URL__MOVIES = useRef();
  const URL__SERIES = useRef();

  useEffect(() => {
    setSinResultados(false);
    setData([]);
    setError(null);
    setIsLoading(true);
    numPaginaAnime.current = 26;
    numPaginaTvMovies.current = 2;

    URL__ANIME.current = `https://api.jikan.moe/v4/anime?q=${query}`;
    URL__MOVIES.current = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    URL__SERIES.current = `https://api.themoviedb.org/3/search/tv?query=${query}`;

    getAllData(URL__ANIME.current, URL__MOVIES.current, URL__SERIES.current)
      .then((data) => {
        const newData = mesclarDatos(data.anime, data.series, data.peliculas);
        setSinResultados(newData.length === 0);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [query]);
  const paginarAnimeTvMovies = useCallback(() => {
    if (error) return;
    setIsLoading(true);

    let urlAnime = rutaPaginar(
      URL__ANIME.current,
      numPaginaAnime.current,
      25,
      "&"
    );
    let urlPeliculas = rutaPaginar(
      URL__MOVIES.current,
      numPaginaTvMovies.current
    );
    let urlSeries = rutaPaginar(URL__SERIES.current, numPaginaTvMovies.current);

    getAllData(urlAnime, urlPeliculas, urlSeries)
      .then((data) => {
        const hasNextPage = data.anime.pagination.has_next_page;
        const moviesTotalPages = data.peliculas.total_pages;
        const seriesTotalPages = data.series.total_pages;

        if (
          !hasNextPage &&
          numPaginaTvMovies.current > moviesTotalPages &&
          numPaginaTvMovies.current > seriesTotalPages
        ) {
          setError("No hay próximos resultados");
          setIsLoading(false);
          return;
        }

        const newData = mesclarDatos(data.anime, data.series, data.peliculas);
        if (newData.length === 0) throw new Error("No hay resultados");
        setData((prevData) => [...prevData, ...newData]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });

    numPaginaAnime.current += 25;
    numPaginaTvMovies.current++;
  }, [error]);

  UseScrollBottom(paginarAnimeTvMovies, isLoading);

  return (
    <div className="container">
      <h4 className="mb-5 ">searching for '{query}'</h4>
      {sinResultados && <SinResultados />}
      <Grid isLoading={isLoading} data={data} error={error} />
    </div>
  );
};

export default Resultados;
