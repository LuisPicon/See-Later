import { useContext, useState } from "react";
import { Marcador, MarcadorLleno } from "../icons/icons";
import DataLocalContext from "../../context/contextDataLocal";
import MensajeGuardado from "../mensajeGuardado/mensajeGuardado";
import { toast } from "sonner";
import "./style.css";

const GuardarTarjeta = ({ guardado = false, data }) => {
  const [guardar, setGuardar] = useState(guardado);
  const { guardarDato, eliminarDato, handlePrevDataLocal } =
    useContext(DataLocalContext);
  const messageSaved = () =>
    toast.success(`Saved ${data.title}`, {
      className: "positionConfig",
    });
  const messageDeleted = () =>
    toast(`Eliminated ${data.title}`, {
      action: { label: "Undo", onClick: () => restartItem() },
      className: "positionConfig",
    });
  const restartItem = () => {
    handlePrevDataLocal();
    setGuardar(true);
  };
  const handleClick = (e) => {
    if (guardar) {
      setTimeout(() => {
        eliminarDato(data.id);
        messageDeleted();
      }, 120);
    } else {
      data.saved = true;
      guardarDato(data);
      messageSaved();
    }
    setGuardar(!guardar);
  };

  return (
    <>
      <div className="guardar__tarjeta" onClick={handleClick}>
        {guardar ? <MarcadorLleno /> : <Marcador />}
      </div>
    </>
  );
};

export default GuardarTarjeta;
