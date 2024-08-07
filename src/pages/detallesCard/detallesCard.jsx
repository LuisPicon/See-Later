import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../componentes/icons/icons";

import getData from "../../helpers/getData";
import GridDetalles from "../../componentes/gridDetalles/gridDetalles.";
import ErrorInterno from "../../componentes/errorInterno/errorInterno";
import "./detallesCard.css";
import validItemSaved from "../../helpers/validItemSaved";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzFmZTEwMjhiZWM0ZDE3NGIxZWRhNDhjODk5OTk5ZiIsIm5iZiI6MTcyMDczMjI3Ny41NjU1Nywic3ViIjoiNjY5MDQ5NzUwNTZiNjdmNzk5ODA3ZTk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.v33yBC7Q4vNG0hfKts1NClo2r3e1VUwzzvJns9czUQg",
  },
};
const DetallesCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { recurso, id } = useParams();
  const [error, setError] = useState(null);
  const getAnime = () => {
    getData(`https://api.jikan.moe/v4/anime/${id}`)
      .then((dataAnime) => {
        console.log(dataAnime);
        const newData = {
          title: dataAnime.data.title,
          image: dataAnime.data.images.jpg.large_image_url,
          description: dataAnime.data.synopsis,
          genres: dataAnime.data.genres.map((el) => el.name),
          structure: [
            `Release Year ${dataAnime.data.year}`,
            `${dataAnime.data.episodes} episodes`,
            `duration ${dataAnime.data.duration} `,
          ],
          saved: validItemSaved(dataAnime.data.mal_id),
          year: dataAnime.data.year || "?",
          id: dataAnime.data.mal_id,
          type: "anime",
          relates: [],
        };
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  const getMovie = () => {
    getData(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((dataMovie) => {
        let newData = {
          title: dataMovie.title,
          image: `https://image.tmdb.org/t/p/w500${dataMovie.poster_path}`,
          description: dataMovie.overview,
          year: dataMovie.release_date.split("-")[0],
          id: dataMovie.id,
          type: "movies",
          saved: validItemSaved(dataMovie.id),
          genres: dataMovie.genres.map((el) => el.name),
          structure: [
            `Release Year ${dataMovie.first_air_date}`,
            `${dataMovie.runtime} minutes`,
            `Original Country ${dataMovie.origin_country[0]}`,
          ],
        };
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  const getSeries = () => {
    getData(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then((dataSeries) => {
        let newData = {
          title: dataSeries.name,
          image: `https://image.tmdb.org/t/p/w500${dataSeries.poster_path}`,
          description: dataSeries.overview,
          genres: dataSeries.genres.map((el) => el.name),
          year: dataSeries.first_air_date.split("-")[0],
          id: dataSeries.id,
          type: "series",
          saved: validItemSaved(dataSeries.id),
          structure: [
            `Episodes ${dataSeries.number_of_episodes}`,
            `Release Year ${dataSeries.first_air_date}`,
            `Seasons ${dataSeries.number_of_seasons}`,
            `${dataSeries.episode_run_time[0] || "?"} minutes per episode`,
          ],
        };
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    switch (recurso) {
      case "movies":
        getMovie();
        break;
      case "anime":
        getAnime();

        break;
      case "series":
        getSeries();
        break;
      default:
        break;
    }
  }, [recurso, id]);
  return (
    <>
      <div className="container__detalles container  d-flex  ">
        {isLoading ? <Loader /> : <GridDetalles data={data} />}
      </div>
      {error && <ErrorInterno ruta="" error={error} />}
    </>
  );
};

export default DetallesCard;
