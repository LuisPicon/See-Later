import { createContext, useRef, useState } from "react";

const DataLocalContext = createContext();

const DataLocalProvider = ({ children }) => {
  const [dataLocal, setDataLocal] = useState(() => {
    let dataLocal = localStorage.getItem("watchLater");
    if (!dataLocal) {
      localStorage.setItem("watchLater", "[]");
      return [];
    }
    return JSON.parse(dataLocal);
  });
  const prevDataLocal = useRef([]);

  const eliminarDato = (id) => {
    prevDataLocal.current = dataLocal;
    const newData = dataLocal.filter((el) => el.id !== id);
    localStorage.setItem("watchLater", JSON.stringify(newData));
    setDataLocal(newData);
  };
  const guardarDato = (dataGuardar) => {
    let newData = [...dataLocal, dataGuardar];
    localStorage.setItem("watchLater", JSON.stringify(newData));
    setDataLocal(newData);
  };
  const deleteGenre = (genre) => {
    if (genre == "all") {
      setDataLocal([]);
      localStorage.setItem("watchLater", "[]");
    } else {
      const newData = dataLocal.filter((el) => el.type !== genre);
      localStorage.setItem("watchLater", JSON.stringify(newData));
      setDataLocal(newData);
    }
  };
  const handlePrevDataLocal = () => {
    const newData = prevDataLocal.current;
    localStorage.setItem("watchLater", JSON.stringify(newData));
    setDataLocal(newData);
  };

  const data = {
    dataLocal,
    guardarDato,
    eliminarDato,
    deleteGenre,
    handlePrevDataLocal,
  };
  return (
    <DataLocalContext.Provider value={data}>
      {children}
    </DataLocalContext.Provider>
  );
};
export { DataLocalProvider };

export default DataLocalContext;
