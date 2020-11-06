import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../scss/progress.scss";
import { getProgress } from "../../ducks/mreducer";

function Progress(props) {
  const [state, sState] = useState({
    fname: "",
    editProgress: "",
    deleteProgress: "",
    age: 0,
    updateAge: false
  });

  const getProgress = () => {
    const { search } = state;
    axios
      .get(`/api/progress?search=${search}`)
      .then((res) => sState({ ...state, progress: res.data }))
      .catch((err) => console.log(err));
  };
  console.log(props);
  
  const handleAge = () => {
    if(state.updateAge) {
      axios
      .put(`/api/progress`)
      .then((res) => { 
      sState({ ...state, age: res.data, updateAge: false})
      })
      .catch((err) => console.log(err));
    } else {
      sState({ ...state, updateAge: true})
    }
  }

  const deleteAge = () => {
      axios
      .delete(`/api/progress`)
      .then((res) => { 
      sState({ ...state, age: 0})
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
      console.log(e.target.name, e.target.value)
      sState({ ...state, [e.target.name]: e.target.value });  
  }

  const ageInput = () => {
    if(state.updateAge) {
      return <input name="age" value={state.age} onChange={handleChange} ></input>
    } else {
      return <input name="age" value={state.age} onChange={handleChange} disabled></input>
    }
  }

  return (
    <div className="progress2">
      <header className="dash-header">
        <div className="dash-header-cont">
          <span className='Progress'>{state.measurements}</span>
        </div>

        <div className="search-flex">
          <input
            value={state.search}
           
            placeholder="Search by Date"
          />
          <button onClick={getProgress} className="search-button">
            Reset
          </button>
          <button className="reset-button">
            Edit
          </button>
        </div>
      </header>
      <div className="dashboard-table">
        <div className="table-header">
          <span className="progress-date">Date Created</span>
        </div>
        <div>
          <span>Age:</span>
            {ageInput()}
          <button onClick={handleAge}>Update Age</button>
          <button onClick={deleteAge}>Delete Age</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Progress);
