const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzFmZTEwMjhiZWM0ZDE3NGIxZWRhNDhjODk5OTk5ZiIsIm5iZiI6MTcyMDczMjI3Ny41NjU1Nywic3ViIjoiNjY5MDQ5NzUwNTZiNjdmNzk5ODA3ZTk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.v33yBC7Q4vNG0hfKts1NClo2r3e1VUwzzvJns9czUQg",
  },
};
async function getAllData(urlAnime, urlPeliculas, urlSeries) {
  const data = {
    anime: [],
    series: [],
    peliculas: [],
  };
  try {
    const [resAnime, resPeliculas, resSeries] = await Promise.all([
      fetch(urlAnime),
      fetch(urlPeliculas, options),
      fetch(urlSeries, options),
    ]);
    if (!resAnime.ok && !resPeliculas.ok && !resSeries.ok) {
      throw new Error("Error en todas las respuestas");
    }
    if (resAnime.ok) data.anime = await resAnime.json();

    if (resPeliculas.ok) data.peliculas = await resPeliculas.json();
    if (resSeries.ok) data.series = await resSeries.json();

    return data;
  } catch (error) {
    return error;
  }
}
export default getAllData;
