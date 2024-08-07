import infoUtilAnime from "./infoUtilAnime";
import infoUtilMovies from "./infoUtilMovies";
import infoUtilSeries from "./infoUtilSeries";

function mesclarDatos(anime, series, peliculas) {
  const newData = [];
  let arrayAnime = anime.data || [];
  let arraySeries = series.results || [];
  let arrayPeliculas = peliculas.results || [];

  //crea el nuevo arreglo extraer los Datos útiles del cada posición de los arreglos
  let contador = 0;
  let maxLength = Math.max(
    arrayAnime.length,
    arraySeries.length,
    arrayPeliculas.length
  );
  while (contador < maxLength) {
    let posicionSeries = arraySeries[contador];
    if (posicionSeries) {
      const valid = newData.some(
        (item) =>
          posicionSeries.name === item.title &&
          parseInt(posicionSeries.first_air_date.split("-")[0]) === item.year
      );
      if (!valid) {
        let data = infoUtilSeries(posicionSeries);
        newData.push(data);
      }
    }
    let posicionPeliculas = arrayPeliculas[contador];
    if (posicionPeliculas) {
      let data = infoUtilMovies(posicionPeliculas);
      newData.push(data);
    }
    let posicionAnime = arrayAnime[contador];
    if (posicionAnime) {
      let valid = newData.some((item) => item.title === posicionAnime.title);
      if (!valid) {
        let data = infoUtilAnime(posicionAnime);
        newData.push(data);
      }
    }

    contador++;
  }
  return newData;
}
export default mesclarDatos;
