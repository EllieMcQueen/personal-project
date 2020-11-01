import React, { useState } from "react";
import store from '../../ducks/store';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import noImage from './no_image.jpg';
import "../../scss/measurements.scss";

const Measurements = () => {
  const [state, sState] = useState({
    rightArm: "",
    leftArm: "",
    highWaist: "",
    waist: "",
    rightLeg: "",
    leftLeg: "",
    weight: "",
    activity: 0,
  });

  const handleInput = (e) => {
    sState({ ...state, [e.target.name]: e.target.value });
  };

  const createPost = () => {
    const { age, gender, height, weight, activity } = state;
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
//store tdee in redux
    console.log(tdee.toFixed(2));

    // send any of the above that's necessary to the back for storage
    // also, in .then, send necessary updates to redux
    // at this point, we should have age, gender, height, weight, activity (as well as the new tdee value)
    axios
      .post("/api/post", { age, gender, height, weight, activity, tdee })
      .then((res) => {
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
          value={state.height}
          name="height"
          placeholder="Height"
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
      <>
        <select className="activity" onChange={handleInput}>
          <option value="title">Choose Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Activity</option>
          <option value="moderate">Moderate Activity</option>
          <option value="vActive">Very Active</option>
          <option value="eActive">Extra Active</option>
          <option value="sActive">Super Active</option>
        </select>
      </>

      <Link to="/progress">
        <button onClick={createPost} className="form-submit-button">
          Submit
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Measurements);
