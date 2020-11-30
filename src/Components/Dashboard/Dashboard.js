import React, {useState, useEffect} from 'react';
import axios from "axios";
import { connect } from "react-redux";
import "../../scss/Dashboard.scss";
import { Link } from "react-router-dom";


function Dashboard(props) {
  const [state, sState] = useState({
    tdee: 0,
    weight: 0,
    intake: '',
    calories: 0,
    fats: 0,
    protein: 0,
    carbs:0
  });

const handleInput = (e) => {
  sState({...state, [e.target.name]: e.target.value});
};

const createMacros = () => {
  const { intake } = state
  console.log(props.initialinfo)
  const { weight, tdee }=props.initialinfo
  // console.log(weight, tdee, intake);
  let calories
  let two
  let three 
  let protein 
  let fats
  let carbs
 


if (intake === 'cutting') {
    calories = tdee * 0.8;
    protein = weight  * 4
    fats = weight * 0.25 * 9;
    two = (calories - fats) - protein;
    three = tdee - two;
    carbs = three / 4;

  } else if (intake === 'maintain') {
    calories = tdee * 1;
    protein = weight * 4
    fats = (weight * 0.4) * 9
    two = (calories - fats) - protein
    three = tdee - two
    carbs = three / 4

  } else if (intake === 'bulking') {
    calories = tdee * 1.10;
    protein = weight * 4 
    fats = (weight * 0.4) * 9
    two = (calories - fats) - protein
    three = tdee - two
    carbs = three / 4
  }
  console.log(two)
  console.log(three)
  console.log (calories)
  console.log(fats)
  console.log(protein)
  console.log(carbs)
  sState({ ...state, calories: calories.toFixed(2), fats: fats.toFixed(2), protein: protein.toFixed(2), carbs: carbs.toFixed(2)})
  // sState({...state, calories: calories, fats: fats, protein: protein, carbs: carbs})
  

  // ;
  // console.log(calories.toFixed(2));
  // console.log(fats.toFixed(2));
  // console.log(protein.toFixed(2));
  // console.log(carbs.toFixed(2));

  axios
  .post('/api/macros', { calories, fats, protein, carbs })
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
        <select className='intake' onChange={handleInput} name='intake'>
          <option value="title">CHOOSE GOAL</option>
          <option value="maintain">MAINTAINING</option>
          <option value="cutting">CUTTING</option>
          <option value="bulking">BULKING</option>
        </select>
        <button onClick={createMacros} className="form-submit-button">GET MACROS</button>
       
        <span className='calories'>Calories: {state.calories}</span>
        <span className='fats'>Fats: {state.fats}</span>
        <span className='protein'>Protein: {state.protein}</span>
        <span className='carbs'>Carbs: {state.carbs}</span>
     
       
      
      </div>

   
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Dashboard);