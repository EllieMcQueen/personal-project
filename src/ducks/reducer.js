import axios from "axios";

//ADDING TO REDUX
  //STEP 1 - ADD TO INITIAL STATE
  //STEP 2 - CREATE AN ACTION TYPE
  //STEP 3 - CREATE AN ACTION CREATOR 
  //STEP 4 - UPDATE THE REDUCER

//initial state
const initialState = {
  email: "",
  id: 0,
  age: '',
  gender: '',
  height: '',
  weight:'',
  activity: '',
  tdee: 0,
};

//action types
const GET_USER = "GET_USER",
      LOGIN_USER = "LOGIN_USER",
      LOGOUT_USER = "LOGOUT_USER",
      SET_TDEE = 'SET_TDEE';
//action creators
export function setTdee(tdee, weight, activity){
  return {
    type: SET_TDEE,
    payload: {
      tdee: tdee,
      weight: weight,
      activity: activity,
    },
  };
}

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
//reducer
export default function (state = initialState, action) {
  console.log (action)
  switch (action.type) {
    case LOGIN_USER: {
      const { email, id, age, gender, height, weight} = action.payload;
      return { email, id, age, gender, height, weight};
    }
    case SET_TDEE:
      const { tdee, weight, activity } = action.payload;
      return { ...state, tdee: tdee, weight: weight, activity: activity }
    case LOGOUT_USER:
      return initialState;
    case GET_USER + "_PENDING":
      return { ...state };
    case GET_USER + "_FULFILLED": {
      const { email, id, age, gender, height, weight } = action.payload;
      return { email, id, age, gender, height, weight };
    }
    case GET_USER + "_REJECTED":
      return initialState;
    default:
      return state;
  }
}
