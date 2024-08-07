import validItemSaved from "./validItemSaved";

function infoUtilAnime(element) {
  let dataUtil = {
    title: element.title,
    year: element.year || "?",
    image: element.images.webp.large_image_url,
    type: "anime",
    id: element.mal_id,
    saved: validItemSaved(element.mal_id),
  };
  return dataUtil;
}
export default infoUtilAnime;
