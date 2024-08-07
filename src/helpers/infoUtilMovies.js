import validItemSaved from "./validItemSaved";

function infoUtilMovies(element) {
  let numRandom = Math.random();

  let dataUtil = {
    title: element.title,
    year: element.release_date.split("-")[0],
    image: `https://image.tmdb.org/t/p/w500/${element.poster_path}`,
    type: "movies",
    key: `${element.id}${numRandom}`,
    id: element.id,
    saved: validItemSaved(element.id),
  };
  return dataUtil;
}
export default infoUtilMovies;
