import { useEffect, useRef } from "react";
import "./style.css";
import { useState } from "react";
import getAllData from "../../helpers/getAllData";
import mesclarDatos from "../../helpers/mesclarDatos";
import { LoaderSearch } from "../icons/icons";
import { useNavigate } from "react-router-dom";
import CardBusqueda from "../cardBusquda/cardBusqueda";

const URL__ANIME = "https://api.jikan.moe/v4/anime?q=";
const URL__MOVIE = "https://api.themoviedb.org/3/search/movie?query=";
const URL__SERIES = "https://api.themoviedb.org/3/search/tv?query=";

const Buscador = ({ stopPropagation, handleClick, setOpen }) => {
  const [valorInput, setValorInput] = useState("");
  const [data, setData] = useState([]);
  const [nullSearch, setNullSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    setValorInput(e.target.value);
  };

  const handleSearchClick = () => {
    handleClick();
    navigate("/search/" + valorInput);
  };

  const handleKeyDown = (e) => {
    if (e.target.value === "") setNullSearch(false);
    if (e.key === "Enter") {
      handleClick();
      navigate("/search/" + valorInput);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (valorInput.length <= 2 || valorInput.length === 0) {
      setData([]);
      setNullSearch(null);
      setIsLoading(false);
      clearTimeout(timeoutRef.current);
      return;
    }

    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      const urlBuscarAnime = URL__ANIME + valorInput;
      const urlBuscarSeries = URL__SERIES + valorInput;
      const urlBuscarPeliculas = URL__MOVIE + valorInput;

      getAllData(urlBuscarAnime, urlBuscarPeliculas, urlBuscarSeries)
        .then((data) => {
          const newData = mesclarDatos(data.anime, data.series, data.peliculas);
          setData(newData);
          setNullSearch(newData.length === 0);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setData([]);
          setNullSearch(true);
          setIsLoading(false);
        });
    }, 300);

    // Limpiar el timeout si el componente se desmonta o el valor del input cambia
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [valorInput]);

  return (
    <div
      className="container d-flex flex-column justify-content-start  align-items-center  m-auto  "
      style={{ height: "100vh" }}
    >
      <div className="mt-4 container__buscador " onClick={stopPropagation}>
        {/*Buscador */}
        <div className="d-flex justify-content-sm-center justify-content-lg-between align-items-center gap-2 ">
          <input
            autoFocus
            className="form-control "
            type="search"
            placeholder="Search..."
            value={valorInput}
            onChange={handleChange}
            onKeyUp={handleKeyDown}
            aria-label="Search"
          />

          <button className="btn" type="submit" onClick={handleSearchClick}>
            <p>Search</p>
          </button>
        </div>
        <div
          className={`grid__search opacity-0 ${data.length > 0 && "opacity-100"}
            ${isLoading && "opacity-100"}
            ${nullSearch && "opacity-100"}
          `}
        >
          {nullSearch && !isLoading && (
            <p className="text-center">No results found</p>
          )}
          {isLoading ? (
            <LoaderSearch />
          ) : (
            data.map((el) => (
              <CardBusqueda
                img={el.image}
                title={el.title}
                id={el.id}
                type={el.type}
                key={el.id}
                setOpen={setOpen}
              />
            ))
          )}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-danger d-flex gap-1 position-absolute"
        aria-label="Close"
        style={{
          "--bs-btn-close-width": "32px",
          "--bs-btn-close-height": "32px",
          bottom: "1rem",
          left: "1rem",
        }}
      >
        <p style={{ color: "#fff" }}>close</p>
      </button>
    </div>
  );
};

export default Buscador;
