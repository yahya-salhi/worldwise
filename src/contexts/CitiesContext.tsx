import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:7000";

const CitiesContext = createContext();

// i want to use Reducer mangment state instead of useContext
const initialState = {
  cities: [],
  isLoding: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoding: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoding: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoding: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoding: false,
        cities: [...state.cities, action.payload],
        //yabga leklick eli bel vert 3la city ejdida
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoding: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        //yetna7 leklick eli bel vert
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoding: false,
        error: action.payload,
      };
    default:
      throw new Error("unkown action type");
  }
}

//

function CitiesProvider({ children }) {
  const [{ cities, isLoding, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoding, setIsLoding] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoding(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // alert("there was an error loading data ...");
        dispatch({
          type: "rejected",
          payload: "there was an error loading data ...",
        });
      }
      //  finally {
      //   setIsLoding(false);
      // }
    }
    fetchCities();
  }, []);

  //function for currentCity
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      // setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
      // setCurrentCity(data);
    } catch {
      // alert("there was an error loading the city ...");
      dispatch({
        type: "rejected",
        payload: "there was an error loading the city ...",
      });
    }
    // finally {
    //   setIsLoding(false);
    // }
  }
  // add new city to my api
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error creating city ...",
      });
      // alert("there was an error creating city ...");
    }
    // finally {
    //   setIsLoding(false);
    // }
  }

  // delete city
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoding(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deliting city ...",
      });
      // alert("there was an error deliting city ...");
    }
    // finally {
    //   setIsLoding(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
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
