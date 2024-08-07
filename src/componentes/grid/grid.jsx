import CardItem from "../cardItem/cardItem";
import GridLoader from "../gridLoader/gridLoader";
import "./grid.css";
const Grid = ({ isLoading, data }) => {
  return (
    <>
      <div className="grid__cards">
        {data.map((el) => (
          <CardItem
            image={el.image}
            title={el.title}
            year={el.year}
            type={el.type}
            id={el.id}
            saved={el.saved}
            key={el.key || el.id}
          />
        ))}
        {isLoading && <GridLoader />}
      </div>
    </>
  );
};

export default Grid;
