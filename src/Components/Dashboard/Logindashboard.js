import React, {useState} from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import "../../scss/Dashboard.scss";
import { Link } from "react-router-dom";


function Logindashboard(props) {
  const [state, sState] = useState({
    
  });

const handleInput = (e) => {
  sState({...state, [e.target.name]: e.target.value});
};

const createMacros = () => {
  console.log (props)
  const {weight, tdee } = props.initialinfo
 var { intake } = state;
  let calories 
  let two
  let three 
  let protein 
  let fats
  let carbs
 


if (intake === 'cutting') {
    calories = tdee * 0.75;
    console.log (calories)
    protein = tdee * 1
    fats = weight * 0.25 * 4;
    two = (calories - fats) - protein;
    three = tdee - two;
    carbs = three / 4;

  } else if (intake === 'maintain') {
    calories = tdee * 1;
    protein = tdee * 1
    fats = weight * 0.04
    two = calories - fats - protein
    three = tdee - two
    carbs = three / 4

  } else if (intake === 'bulking') {
    calories = tdee * 1.05;
    protein = tdee * 1
    fats = weight * 0.04
    two = calories - fats - protein
    three = tdee - two
    carbs = three / 4
  }
  console.log (calories)
  console.log(fats)
  console.log(protein)
  console.log(carbs)

  // sState({ ...state, calories: calories.toFixed(2), fats: fats.toFixed(2), protein: protein.toFixed(2), carbs: carbs.toFixed(2)});
  // console.log(calories.toFixed(2));
  // console.log(fats.toFixed(2));
  // console.log(protein.toFixed(2));
  // console.log(carbs.toFixed(2));

  axios
  .post('api/macros', { calories, fats, protein, carbs })
  .then((res) => {
     console.log('hit the function');
  })
  .catch((error) => console.log(error));
};
return (
    <div className="Dashboard">
      <div className='form-header'>
        <h1 className='title'>MACROS</h1>
      </div>
        <select className='intake' onChange={handleInput}>
          <option value="title">CHOOSE GOAL</option>
          <option value="maintain">MAINTAINING</option>
          <option value="cutting">CUTTING</option>
          <option value="bulking">BULKING</option>
        </select>
        <button onClick={createMacros} className="form-submit-button">GET MACROS</button>
        <span className='chart'>{state.chart}</span>
        <span className='fats'>{state.fats}</span>
        <span className='protein'>{state.protein}</span>
        <span className='carbs'>{state.carbs}</span>
  

    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Logindashboard);