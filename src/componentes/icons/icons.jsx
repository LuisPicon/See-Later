import "bootstrap-icons/font/bootstrap-icons.css";
import "./icons.css";

export function Sun() {
  return <i className="bi bi-sun-fill "></i>;
}
export function Moon() {
  return <i className="bi bi-moon-fill"></i>;
}
export function FlechaAbajo() {
  return <i className="bi bi-chevron-down   ms-1 "></i>;
}
export function Punto() {
  return <i className="bi bi-dot"></i>;
}

export function Marcador() {
  return <i className="bi bi-bookmark pe-none"></i>;
}

export function MarcadorLleno() {
  return <i className="bi bi-bookmark-fill pe-none"></i>;
}
export function IconSearch() {
  return <i className="bi bi-search text-white "></i>;
}

export function Loader() {
  return (
    <div className="spinner-border " role="status">
      <span className="visually-hidden fs-6">Loading...</span>
    </div>
  );
}

export function LoaderSearch() {
  return (
    <div className="spinner-border spinner-search " role="status">
      <span className="visually-hidden fs-6">Loading...</span>
    </div>
  );
}
export function IconFlechaBack() {
  return <i className="bi bi-arrow-left "></i>;
}
