function rutaPaginar(urlBase, numPagina, limit, symbol = "&") {
  let params = new URLSearchParams({
    page: numPagina,
    limit: limit,
  });
  let newUrl = `${urlBase}${symbol}${params}`;
  return newUrl;
}
export default rutaPaginar;
