import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import getData from "../../helpers/getData";
import rutaPaginar from "../../helpers/rutaPaginar";
import infoUtilSeries from "../../helpers/infoUtilSeries";

const inicialUrlSeries =
  "https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzFmZTEwMjhiZWM0ZDE3NGIxZWRhNDhjODk5OTk5ZiIsIm5iZiI6MTcyMDczMjI3Ny41NjU1Nywic3ViIjoiNjY5MDQ5NzUwNTZiNjdmNzk5ODA3ZTk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.v33yBC7Q4vNG0hfKts1NClo2r3e1VUwzzvJns9czUQg",
  },
};
const useGetSeries = ({ isFistRender, numPaginaSeries }) => {
  const urlSeries = useRef(inicialUrlSeries);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFiltros, setDataFiltros] = useState([]);
  const [filtroActual, setFiltroActual] = useState({
    name: "All",
    id: null,
  });

  const dataUtilSeries = (data = []) => {
    const newData = [];
    for (let i of data) {
      let dataUtil = infoUtilSeries(i);
      newData.push(dataUtil);
    }
    return newData;
  };

  const paginarSeries = () => {
    setIsLoading(true);
    const ruta = rutaPaginar(urlSeries.current, numPaginaSeries.current);
    getData(ruta, options)
      .then((data) => {
        let results = data.results;
        const dataUtil = dataUtilSeries(results);
        setData((prevData) => [...prevData, ...dataUtil]);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
    numPaginaSeries.current++;
  };

  useEffect(() => {
    getData("https://api.themoviedb.org/3/genre/tv/list", options).then(
      (data) => {
        setDataFiltros(data.genres);
      }
    );
    getData(inicialUrlSeries, options)
      .then((data) => {
        let results = data.results;
        const dataUtil = dataUtilSeries(results);
        setData(dataUtil);
        setIsLoading(false);
      })
      .catch((error) => setError(error))
      .finally(() => (isFistRender.current = false));
  }, []);

  useEffect(() => {
    if (isFistRender.current && filtroActual.name === "All") return;
    console.log("algo");
    setIsLoading(true);
    if (filtroActual.name === "All") {
      urlSeries.current = inicialUrlSeries;
    } else {
      let urlFiltroSeries = `${inicialUrlSeries}&with_genres=${filtroActual.id}`;
      urlSeries.current = urlFiltroSeries;
    }
    numPaginaSeries.current = 2;
    setData([]);
    getData(urlSeries.current, options)
      .then((data) => {
        const newData = dataUtilSeries(data.results);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.log("error", error);
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
    paginarSeries,
  ];
};

export default useGetSeries;
