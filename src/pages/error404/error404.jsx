const Error404 = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center "
      style={{ height: "50vh" }}
    >
      <h4 className="text-center">Error 404 page not found</h4>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#/">
              <i class="bi bi-house-door-fill"></i>
              Home
            </a>
          </li>
          <li class="breadcrumb-item">
            <a href="#/movies">Movies</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <a href="#/saved">Saved</a>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Error404;
