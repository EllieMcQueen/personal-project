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
  });

  const getProgress = () => {
    const { search } = state;
    axios
      .get(`/api/progress?search=${search}`)
      .then((res) => sState({ ...state, progress: res.data }))
      .catch((err) => console.log(err));
  };
  console.log(props);
  
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
        {/* {mappedProgress} */}
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Progress);
