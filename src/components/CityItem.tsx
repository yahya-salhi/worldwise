import React from "react";
import styles from "./CityItem.module.css";
const formatDate = (date: number | string): string =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
interface City {
  cityName: string;
  emoji: string;
  date: number;
}

interface CityItemProps {
  city: City;
}
const CityItem: React.FC<CityItemProps> = ({ city }) => {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
