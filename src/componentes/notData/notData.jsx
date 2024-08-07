const NotData = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <figure
        style={{
          width: "8rem",
          height: "8rem",
        }}
      >
        <img src="https://svgshare.com/i/18zk.svg" alt="not data img" />
      </figure>
      <h4 className="">No saved items</h4>
    </div>
  );
};

export default NotData;
