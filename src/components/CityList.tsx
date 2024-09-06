import CityItem from "./CityItem";
import style from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by cliking on  a the city on the map  " />
    );
  return (
    <ul className={style.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
