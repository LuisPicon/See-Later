import { HashRouter, Route, Routes } from "react-router-dom";
import Cabecera from "./componentes/cabecera/cabecera.jsx";
import Inicio from "./pages/inicio/inicio.jsx";
import "./App.css";
import Peliculas from "./pages/peliculas/peliculas.jsx";
import Series from "./pages/series/series.jsx";
import Anime from "./pages/animes/animes.jsx";
import Guardado from "./pages/guardado/guardado.jsx";
import Resultados from "./pages/resultados/resultados.jsx";
import Error404 from "./pages/error404/error404.jsx";
import DetallesCard from "./pages/detallesCard/detallesCard.jsx";
import { DataLocalProvider } from "./context/contextDataLocal.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <DataLocalProvider>
        <HashRouter>
          <Cabecera />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/movies" element={<Peliculas />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/series" element={<Series />} />
            <Route path="/saved" element={<Guardado />} />
            <Route path="/search/:query" element={<Resultados />} />
            <Route path="/:recurso/:id" element={<DetallesCard />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </HashRouter>
      </DataLocalProvider>
      <Toaster />
    </>
  );
}

export default App;
