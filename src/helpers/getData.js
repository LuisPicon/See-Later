async function getData(url, options = {}) {
  try {
    let res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    let data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export default getData;
