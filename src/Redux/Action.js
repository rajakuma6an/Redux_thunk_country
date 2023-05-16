import axios from "axios";
import { Endpoints } from "../Services/EndPoints";

export const setCountries = (countries) => ({
  type: "SET_COUNTRIES",
  payload: countries,
});

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(Endpoints.GetAllCountry);
      dispatch(setCountries(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
