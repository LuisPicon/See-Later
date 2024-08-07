function validItemSaved(id) {
  const dataLocal = localStorage.getItem("watchLater");
  if (dataLocal) {
    const dataLocalParse = JSON.parse(dataLocal);
    const valid = dataLocalParse.some((el) => el.id === id);
    return valid;
  }
}

export default validItemSaved;
