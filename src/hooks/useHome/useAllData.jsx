import { useState, useEffect } from "react";
import mesclarDatos from "../../helpers/mesclarDatos.js";
import getAllData from "../../helpers/getAllData.js";
import rutaPaginar from "../../helpers/rutaPaginar.js";

const UseAllData = (
  URL__ANIME,
  URL__PELICULAS,
  URL__SERIES,
  numPaginaAnime,
  numPaginaTvMovies
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const paginarAnimeTvMovies = () => {
    setIsLoading(true);
    let urlAnime = rutaPaginar(URL__ANIME, numPaginaAnime.current, 25, "?");
    let urlPeliculas = rutaPaginar(URL__PELICULAS, numPaginaTvMovies.current);
    let urlSeries = rutaPaginar(URL__SERIES, numPaginaTvMovies.current);
    getAllData(urlAnime, urlPeliculas, urlSeries)
      .then((data) => {
        const newData = mesclarDatos(data.anime, data.series, data.peliculas);
        setData((prevData) => [...prevData, ...newData]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    numPaginaAnime.current += 25;
    numPaginaTvMovies.current++;
  };

  useEffect(() => {
    getAllData(URL__ANIME, URL__PELICULAS, URL__SERIES)
      .then((data) => {
        const newData = mesclarDatos(data.anime, data.series, data.peliculas);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);

        setError(error);
      });
  }, []);

  return {
    data,
    setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    paginarAnimeTvMovies,
  };
};

export default UseAllData;
