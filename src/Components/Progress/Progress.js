import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../scss/progress.scss";
import { getProgress } from "../../ducks/mreducer";

function Progress(props) {
  const [state, sState] = useState({
    fname: "",
    date:'',
    progress: [],
  });

  //use this hook when you want something to load when the page loads
  useEffect(() => {
    axios.get('/api/progress')
    .then(res => sState({...state, progress: res.data}))
    .catch(err => console.log('get entry request failed'))
  },[])
  

let mappedProgress =  state.progress.map( (el,i) => {
  let date = new Date(el.date)
  return(
    <Link className='progress-fl' to={`/progressDetails/${el.id}`} key={i} >
            <div className='progress'>
                    <div className='progress-title'>
                        <span>Measurements {date.toDateString().split(' ').slice(1).join(' ')}</span>
                        <span className='chevron-right'>&#8250;</span>
                    </div>
                    {/* //<img className="purchase-history-img" src={el.img_url} alt='product image'/> */}
                </div>
            </Link>)})

  return (
     <div {...props}>
           <header className="progress-history-header">
           <p className="progress-history-exit"  onClick={() => {
                    props.history.push("/home")
                }}>Back</p>
                <p className="progress-history-title">Progress History</p>
                <button className="progress-history-faq">?</button>
            </header>
            {state.progress.length === 0?
            <h1 className='no-progress'>You have no progress yet</h1>
            
            :
            <div className='order-flex'>
                {mappedProgress}
            </div>
            }
            
        </div>
        
    )
    
}
    
          // return (
          //   <div key={i} >
          //     {/* add measurements */}
          //     <span>Calories: {post.calories}</span>
          //     <span>Carbs: {post.carbs}</span>
          //     <span>fats: {post.fats}</span>
          //     <span>protein: {post.protein}</span>
        

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, {})(Progress);
