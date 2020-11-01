import axios from "axios";
 

const initialState = {
    measurements: {}
};

const GET_MEASUREMENTS = "GET_MEASUREMENTS",
      GET_PROGRESS = "GET_PROGRESS",
      GET_TDEE = "GET_TDEE";

export function getMeasurements () {
    const payload = axios.get("/api/measure");
  return {
    type: GET_MEASUREMENTS,
    payload: payload,
    };
}

export function getProgress () {
    const payload = axios.get("/api/measure");
  return {
    type: GET_PROGRESS,
    payload: payload,
    };
}
export function getTdee () {
    const payload = axios.get("/api/measure");
return {
    type: GET_TDEE,
    payload: payload,
};
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MEASUREMENTS + "_PENDING":
            return { ...state };
        //case GET_MEASUREMENTS + "_FULFILLED":
           //
        case GET_MEASUREMENTS + "_REJECTED":
            return initialState;
        case GET_PROGRESS + "_PENDING":
            return { ...state };
        // case GET_PROGRESS + "_FULFILLED":
        //     return { };
        case GET_PROGRESS + "_REJECTED":
            return initialState;
        case GET_TDEE + "_PENDING":
            return { ...state };
        // case GET_TDEE + "_FULFILLED":
        //     return { };
        case GET_TDEE + "_REJECTED":
            return initialState;
      default:
        return state;
    }
  }