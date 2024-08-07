const Detalles = ({ detalles }) => {
  return (
    <ul>
      {detalles.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  );
};

export default Detalles;
