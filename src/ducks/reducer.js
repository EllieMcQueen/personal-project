import axios from "axios";


const initialState = {
  email: "",
  id: 0,
  age: '',
  gender: '',
  height: '',
  weight:'',
};

const GET_USER = "GET_USER",
      LOGIN_USER = "LOGIN_USER",
      LOGOUT_USER = "LOGOUT_USER";

export function loginUser(email, id, age, gender, height, weight) {
  return {
    type: LOGIN_USER,
    payload: {
      email: email,
      id: id,
      age: age, 
      gender: gender,
      height: height,
      weight: weight,
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
  const payload = axios.get("/api/auth/user");
  return {
    type: GET_USER,
    payload: payload,
  };
}

export default function (state = initialState, action) {
  console.log (action)
  switch (action.type) {
    case LOGIN_USER:
      const { email, id, age, gender, height, weight} = action.payload;
      return { email, id, age, gender, height, weight};
    case LOGOUT_USER:
      return initialState;
    case GET_USER + "_PENDING":
      return { ...state };
    case GET_USER + "_FULFILLED":
      return { email, id, age, gender, height, weight };
    case GET_USER + "_REJECTED":
      return initialState;
    default:
      return state;
  }
}
