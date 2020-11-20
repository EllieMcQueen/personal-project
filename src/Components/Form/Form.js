import React, { useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import "../../scss/form.scss";
//import { createProfile } from '../../../server/controllers/authcontrollers';

const Form = (props) => {
  const [state, sState] = useState({
    fname: '',
    age: '',
    gender: '',
    height: '', 
  });

  const handleInput = (e) => {
    console.log(e.target.name, e.target.value)
    sState({ ...state, [e.target.name]: e.target.value });
  }
  const createProfile = () => {
   const {fname, age, gender, height} = state;

    axios
    .post("/api/profile", { fname, age, gender, height})
    .then((res) => {
      // props.createProfile(fname, age, gender, height)
      props.history.push('/measure');
    })
    .catch((error) => console.log(error));
  } 

   

    // send any of the above that's necessary to the back for storage
    // also, in .then, send necessary updates to redux
    // at this point, we should have age, gender, height, weight, activity (as well as the new tdee value)
  
      
  

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
        <select className="gender" onChange={handleInput} name='gender'>
          <option value="title">Choose Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    
      <button onClick={createProfile} className="form-submit-button">
          Submit
      </button>
    </div>
  );
};



export default Form;
