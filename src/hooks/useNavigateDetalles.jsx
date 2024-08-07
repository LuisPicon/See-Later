import { useNavigate } from "react-router-dom";

const useNavigateDetalles = () => {
  const navigate = useNavigate();

  const handleNavigate = (typo, id) => {
    const url = `/${typo}/${id}`;
    navigate(url);
  };

  return handleNavigate;
};

export default useNavigateDetalles;
