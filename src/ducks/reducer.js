import axios from "axios";

const initialState = {
  email: "",
  id: 0,
};

const GET_USER = "GET_USER",
      LOGIN_USER = "LOGIN_USER",
      LOGOUT_USER = "LOGOUT_USER";

export function loginUser(email, id) {
  return {
    type: LOGIN_USER,
    payload: {
      email: email,
      id: id,
    },
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null,
  };
}

export function getUser() {
  const payload = axios.get("/api/auth/cust");
  return {
    type: GET_USER,
    payload: payload,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      const { email, id } = action.payload.email;
      return { email, id };
    case LOGOUT_USER:
      return initialState;
    case GET_USER + "_PENDING":
      return { ...state };
    case GET_USER + "_FULFILLED":
      return { email, id };
    case GET_USER + "_REJECTED":
      return initialState;
    default:
      return state;
  }
}
