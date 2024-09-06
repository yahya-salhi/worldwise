import styles from "./CountryItem.module.css";

interface Country {
  emoji: string;
  country: string;
}

interface CountryItemProps {
  countrys: Country;
}

const CountryItem: React.FC<CountryItemProps> = ({ countrys }) => {
  return (
    <li className={styles.countryItem}>
      <span>{countrys.emoji}</span>
      <span>{countrys.country}</span>
    </li>
  );
};

export default CountryItem;
