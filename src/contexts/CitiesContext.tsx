import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:7000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoding(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error loading data ...");
      } finally {
        setIsLoding(false);
      }
    }
    fetchCities();
  }, []);

  //function for currentCity
  async function getCity(id) {
    try {
      setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was an error loading data ...");
    } finally {
      setIsLoding(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context == undefined)
    throw new Error("citiesContext was used outside the citiesProvide");
  return context;
}
export { CitiesProvider, useCities };
