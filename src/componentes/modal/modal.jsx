const Modal = ({ children, open, handleClick }) => {
  return (
    <section
      className="z-3   position-fixed top-0 start-0 end-0 bottom-0"
      style={{ display: open ? "flex" : "none", background: "rgba(0,0,0,0.9)" }}
      onClick={handleClick}
    >
      {children}
    </section>
  );
};

export default Modal;
