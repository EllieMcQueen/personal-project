import React, { useState } from "react";
import store from '../../ducks/store';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import noImage from './no_image.jpg';
import "../../scss/form.scss";

const Form = () => {
  const [state, sState] = useState({
    fname: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: 0,
  });

  const handleInput = (e) => {
    sState({ ...state, [e.target.name]: e.target.value });
  };

  const createPost = () => {
    const { age, gender, height, weight, activity, fname } = state;
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
      .post("/api/profile", { fname, age, gender, height, weight, activity, tdee })
      .then((res) => {
        console.log("hit Form then function");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form">
      <div className="form-header">
        <h1 className="title">Create Profile</h1>
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.fname}
          name="fname"
          placeholder="First Name"
        />
      </div>

      <div>
        <input
          onChange={(e) => handleInput(e)}
          className="input"
          value={state.age}
          name="age"
          placeholder="Age"
        />
      </div>

      {/* <img className="form_img_prev" src={this.state.img} alt="Not Found"/> */}

      {/* <div className="form_img_prev" style={{ backgroundImage: `url('${imgSrc}')`}} alt='preview'></div> */}

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
      <div>
        <select className="gender" onChange={handleInput} name='gender'>
          <option value="title">Choose Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <select className="activity" onChange={handleInput} name ='activity'>
          <option value="title">Choose Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Activity</option>
          <option value="moderate">Moderate Activity</option>
          <option value="vActive">Very Active</option>
          <option value="eActive">Extra Active</option>
          <option value="sActive">Super Active</option>
        </select>
      </div>

      <Link to="/dashboard">
        <button onClick={createPost} className="form-submit-button">
          Submit
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Form);
