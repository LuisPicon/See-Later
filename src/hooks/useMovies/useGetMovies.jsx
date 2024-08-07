import { useEffect, useRef, useState } from "react";
import getData from "../../helpers/getData";
import rutaPaginar from "../../helpers/rutaPaginar";
import infoUtilMovies from "../../helpers/infoUtilMovies";

const inicialUrlPeliculas =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzFmZTEwMjhiZWM0ZDE3NGIxZWRhNDhjODk5OTk5ZiIsIm5iZiI6MTcyMDczMjI3Ny41NjU1Nywic3ViIjoiNjY5MDQ5NzUwNTZiNjdmNzk5ODA3ZTk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.v33yBC7Q4vNG0hfKts1NClo2r3e1VUwzzvJns9czUQg",
  },
};
const UseGetMovies = ({ isFistRender, numPaginaMovies }) => {
  const urlPeliculas = useRef(inicialUrlPeliculas);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFiltros, setDataFiltros] = useState([]);
  const [filtroActual, setFiltroActual] = useState({
    name: "All",
    id: null,
  });
  const dataUtilMovies = (data = []) => {
    const newData = [];
    for (let i of data) {
      let dataUtil = infoUtilMovies(i);
      newData.push(dataUtil);
    }
    return newData;
  };
  const paginarMovies = () => {
    setIsLoading(true);
    console.log(urlPeliculas, numPaginaMovies);
    const ruta = rutaPaginar(urlPeliculas.current, numPaginaMovies.current);
    getData(ruta, options)
      .then((data) => {
        let results = data.results;
        const dataUtil = dataUtilMovies(results);
        setData((prevData) => [...prevData, ...dataUtil]);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
    numPaginaMovies.current++;
  };

  useEffect(() => {
    getData("https://api.themoviedb.org/3/genre/movie/list", options).then(
      (data) => {
        setDataFiltros(data.genres);
      }
    );
    getData(urlPeliculas.current, options)
      .then((data) => {
        let results = data.results;
        const dataUtil = dataUtilMovies(results);
        setData(dataUtil);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      })
      .finally(() => (isFistRender.current = false));
  }, []);

  useEffect(() => {
    if (isFistRender.current || filtroActual.name === "All") return;
    setIsLoading(true);
    if (filtroActual.name === "All") {
      urlPeliculas.current = inicialUrlPeliculas;
    } else {
      let urlFiltroPeliculas = `${inicialUrlPeliculas}&with_genres=${filtroActual.id}`;
      urlPeliculas.current = urlFiltroPeliculas;
    }
    numPaginaMovies.current = 2;
    setData([]);
    getData(urlPeliculas.current, options)
      .then((data) => {
        const newData = dataUtilMovies(data.results);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [filtroActual]);
  return [
    data,
    isLoading,
    error,
    dataFiltros,
    filtroActual,
    setFiltroActual,
    paginarMovies,
  ];
};

export default UseGetMovies;
