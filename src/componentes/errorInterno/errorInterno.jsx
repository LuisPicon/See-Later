import "./errorInterno.css";
const ErrorInterno = ({ ruta, error }) => {
  return (
    <div
      className="alert bg-danger position-fixed  error__interno"
      role="alert"
    >
      <div className="d-flex gap-4 ">
        <span className=""></span>
        <div className="d-flex flex-column gap-2">
          <h6 className="mb-0 " style={{ color: "#fff" }}>
            {error.message}
          </h6>
          <p className="mb-0 " style={{ color: "#ffffffc4" }}>
            The service is not available. Please try again or later.
          </p>
          <a
            href=""
            className="text-decoration-underline"
            style={{ width: "50%", color: "#fff" }}
          >
            Try again
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorInterno;
