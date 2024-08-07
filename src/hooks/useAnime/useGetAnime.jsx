import { useState, useEffect, useRef } from "react";
import getData from "../../helpers/getData";
import rutaPaginar from "../../helpers/rutaPaginar";
import infoUtilAnime from "../../helpers/infoUtilAnime";

let inicialUrlAnime = "https://api.jikan.moe/v4/top/anime";
const UseGetAnime = ({ isFirstRender, numPaginaAnime }) => {
  const urlAnime = useRef(inicialUrlAnime);
  const [filtroActual, setFiltroActual] = useState({
    name: "All",
    id: null,
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFiltros, setDataFiltro] = useState([]);

  const paginarAnime = () => {
    setIsLoading(true);
    const ruta = rutaPaginar(urlAnime.current, numPaginaAnime.current, 25, "?");
    getData(ruta)
      .then((data) => {
        let results = data.data;
        const dataUtil = dataUtilAnime(results);
        setData((prevData) => [...prevData, ...dataUtil]);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
    numPaginaAnime.current += 25;
  };
  const dataUtilAnime = (data = []) => {
    const newData = [];
    for (let i of data) {
      let dataUtil = infoUtilAnime(i);
      newData.push(dataUtil);
    }
    return newData;
  };

  useEffect(() => {
    //trae la Data de los Generos
    getData("https://api.jikan.moe/v4/genres/anime")
      .then((data) => {
        setDataFiltro(data.data);
      })
      .catch((error) => {
        setError(error);
      });
    //trae la Data inicial de los animes
    getData(urlAnime.current)
      .then((data) => {
        let results = data.data;
        const dataUtil = dataUtilAnime(results);
        setData(dataUtil);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      })
      .finally(() => {
        isFirstRender.current = false;
      });
  }, []);

  useEffect(() => {
    if (isFirstRender.current || filtroActual.name === "All") return;
    //reset de datos
    setIsLoading(true);
    numPaginaAnime.current = 25;
    setData([]);
    //crear ruta
    if (filtroActual.name === "All") {
      urlAnime.current = inicialUrlAnime;
    } else {
      let urlFiltroAnime = `https://api.jikan.moe/v4/anime?genres=${filtroActual.id}`;
      urlAnime.current = urlFiltroAnime;
    }

    getData(urlAnime.current)
      .then((data) => {
        const newData = dataUtilAnime(data.data);
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
    paginarAnime,
  ];
};

export default UseGetAnime;
