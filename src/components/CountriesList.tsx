import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first country by cliking on  a the country on the map  " />
    );

  const countries = [
    ...new Map(
      cities.map((city) => [
        city.country,
        { country: city.country, emoji: city.emoji },
      ])
    ).values(),
  ];
  return (
    <ul className={style.countryList}>
      {countries.map((country) => (
        <CountryItem countrys={country} key={country.country} />
      ))}
    </ul>
  );
}
