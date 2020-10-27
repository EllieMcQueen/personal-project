import React, { useState } from "react";

const Progress = () => {
   const [state, sState] = useState({
        weight: "",
        activity: "",
        right_arm: "",
        left_arm: "",
        right_leg:"",
        left_leg: " ",
        waist: "",
        high_waist: "",
        glutes: "",
        tdee: 0
    });
const handleInput = (e) => {

    sState({ ...state, [e.target.name]: e.target.value });
};

// const createPost = () => {
//const newDate
   };

    
export default Progress

//axios .get 