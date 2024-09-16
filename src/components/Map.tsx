import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../components/Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  const [searchParmas, setsearchParms] = useSearchParams();
  const lat = searchParmas.get("lat");
  const lng = searchParmas.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Position :{lat},{lng}
      <button
        onClick={() => {
          setsearchParms({ lat: 23, lng: 50 });
        }}
      >
        {" "}
        on click
      </button>
    </div>
  );
}
