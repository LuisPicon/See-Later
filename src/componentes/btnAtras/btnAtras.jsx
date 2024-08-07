import { useNavigate } from "react-router-dom";
import { IconFlechaBack } from "../icons/icons";

const BtnAtras = () => {
  const navigate = useNavigate();
  return (
    <button
      className="btn  btn-default text-white d-flex align-items-center justify-content-center gap-1"
      style={{ width: "5rem" }}
      onClick={() => navigate(-1)}
    >
      <IconFlechaBack />
      <p>Back</p>
    </button>
  );
};

export default BtnAtras;
