import validItemSaved from "./validItemSaved";

function infoUtilSeries(element) {
  let numRandom = Math.random();
  let dataUtil = {
    title: element.name,
    year: element.first_air_date.split("-")[0],
    image: `https://image.tmdb.org/t/p/w500/${element.poster_path}`,
    type: "series",
    id: element.id,
    key: `${element.id}${numRandom}`,
    saved: validItemSaved(element.id),
  };
  return dataUtil;
}
export default infoUtilSeries;
