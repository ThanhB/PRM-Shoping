import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import apiInstance from "../api";
import { navigateToAuth, navigateToMain } from "../navigationRef";
import { errorParser } from "../api/error";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload.access_token,
        user: action.payload.user,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "", user: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigateToMain();
  } else {
    navigateToAuth();
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      await apiInstance.post("/auth/register", { email, password });

      const response = await apiInstance.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.data.data.access_token);
      dispatch({ type: "signin", payload: response.data.data });

      navigateToMain();
    } catch (err) {
      console.error(err);
      dispatch({
        type: "add_error",
        payload: errorParser(err),
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    // console.log(email, password);
    try {
      const response = await apiInstance.post("/auth/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.data.access_token);
      dispatch({ type: "signin", payload: response.data.data });
      navigateToMain();
    } catch (err) {
      console.error(err);
      dispatch({
        type: "add_error",
        payload: errorParser(err),
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigateToAuth();
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "", user: null }
);
