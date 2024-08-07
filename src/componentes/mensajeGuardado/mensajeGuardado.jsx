import "./mensajeGuardado.css";

const MensajeGuardado = ({ type }) => {
  const mensaje = `Saved ${type} `;
  return (
    <div
      class="alert bg-dark-mode top-animation  position-bottom shadow-lg"
      role="alert"
      style={{ width: "14rem", zIndex: 80 }}
    >
      <div class="d-flex justify-content-between">
        <p className="fs-6 color-dark-mode">{mensaje}</p>
        <a href="#/saved" className="fs-6 ">
          View Saved
        </a>
      </div>
    </div>
  );
};

export default MensajeGuardado;
