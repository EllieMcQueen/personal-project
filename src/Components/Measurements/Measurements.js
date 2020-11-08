import React, { useState, useEffect } from "react";
import store from '../../ducks/store';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import noImage from './no_image.jpg';
import "../../scss/measurements.scss";
import { setTdee } from '../../ducks/reducer';
//USING THE FUNCTION WE MADE IN THE REDUCER FILE:
  //STEP 1 - IMPORT IT
  //STEP 2 - CONNECT IT
    //PLACES CONNECTED COPYON PROPS
  //STEP 3 - USE IT WHEREVER WE NEED TO (MAKE SURE TO REFERENCE FROM PROPS);

const Measurements = (props) => {
  const [state, sState] = useState({
    rightArm: "",
    leftArm: "",
    highWaist: "",
    waist: "",
    rightleg: "",
    leftleg: "",
    weight: "",
    height: 0,
    age: 0,
    gender: '',
    activity: '',
    date: new Date()
  });

  useEffect(() => {
    axios.get('/api/getCustInfo')
    .then(res => sState({...state, height: res.data.height, age: res.data.age, gender: res.data.gender }))
    .catch(err => console.log(err))
  },[])


  const handleInput = (e) => {
    console.log(e.target.name, e.target.value)
    sState({ ...state, [e.target.name]: e.target.value });
  };
  const handleActivityInput = (activity) => {
    sState({...state, activity: activity.target.value})
  }


  const createPost = () => {
    const {age, gender, height, weight, activity, rightArm, leftArm, highWaist, waist, rightleg, leftleg, date} = state;
    const weightKg = (weight / 2.205) * (10.0).toExponential(2);
    const heightCm = height * 12.0 * 2.54 * (6.25).toExponential(2);
    const agediv = -5 * age;
    let tdee = 0;
    let bmr = 0;
    console.log(age, height, weight, gender, activity);
    console.log(weightKg, heightCm);
    console.log(agediv);
    
    if (gender === "Male") {
      bmr = weightKg + heightCm + agediv + 5;
    } else {
      bmr = weightKg + heightCm + agediv - 161;
    }

    if (activity === "sedentary") {
      tdee = bmr * 1.15;
    } else if (activity === "light") {
      tdee = bmr * 1.2;
    } else if (activity === "moderate") {
      tdee = bmr * 1.4;
    } else if (activity === "vActive") {
      tdee = bmr * 1.6;
    } else if (activity === "eActive") {
      tdee = bmr * 1.8;
    } else if (activity === "sActive") {
      tdee = bmr * 1.9;
    }

    sState({ ...state, tdee: tdee.toFixed(2) });
    props.setTdee(tdee.toFixed(2), weight, activity);
    
    console.log(tdee.toFixed(2));

    // send any of the above that's necessary to the back for storage
    // also, in .then, send necessary updates to redux
    // at this point, we should have age, gender, height, weight, activity (as well as the new tdee value)
    
    axios
      .post("/api/measure", { rightArm, leftArm, highWaist, waist, rightleg, leftleg, weight, date})
      .then((res) => {
        props.history.push('/dashboard')
        console.log("hit Form then function");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="measurements">
      <div className="form-header">
        <h1 className="title">MEASUREMENTS</h1>
      </div>
    
      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.rightArm}
          name="rightArm"
          placeholder="Right Arm"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.leftArm}
          name="leftArm"
          placeholder="left Arm"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.highWaist}
          name="highWaist"
          placeholder="High Waist"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.waist}
          name="waist"
          placeholder="Waist"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.rightleg}
          name="rightleg"
          placeholder="Right Leg"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.leftleg}
          name="leftleg"
          placeholder="left Leg"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.weight}
          name="weight"
          placeholder="Weight"
        />
      </div>
      <div>
        <select className="activity" onChange={handleActivityInput} name ='activity'>
          <option value="title">Choose Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Activity</option>
          <option value="moderate">Moderate Activity</option>
          <option value="vActive">Very Active</option>
          <option value="eActive">Extra Active</option>
          <option value="sActive">Super Active</option>
        </select>
        </div>
      

      
        <button onClick={createPost} className="form-submit-button">
          Submit
        </button>
     
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, {setTdee})(Measurements);
