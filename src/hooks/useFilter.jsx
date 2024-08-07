import { useEffect } from "react";
import getAllData from "../helpers/getAllData.js";
import mesclarDatos from "../helpers/mesclarDatos.js";

const useFilter = ({
  urlAnime,
  urlPeliculas,
  urlSeries,
  numPaginaAnime,
  numPaginaTvMovies,
  setData,
  setIsLoading,
  setError,
}) => {
  useEffect(() => {
    numPaginaAnime.current = 26;
    numPaginaTvMovies.current = 2;
    setData([]);
    setIsLoading(true);
    getAllData(urlAnime, urlPeliculas, urlSeries)
      .then((data) => {
        const newData = mesclarDatos(data.anime, data.series, data.peliculas);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [urlAnime, urlPeliculas, urlSeries]);
};

export default useFilter;
