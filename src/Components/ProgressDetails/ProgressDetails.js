import React, {useState, useEffect, lazy} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import "../../scss/ProgressDetails.scss";


function ProgressDetails(props) {
    const [state, sState] = useState({
        progress: [],
        date: '',
        weight: '',
        measurements: '',
        carbs: '',
        fats: '',
        protein: '',
        calories: '',

    })
    useEffect(()=> {
        const {id} = props.match.params;
        axios
        .get(`/api/progress/single/${id}`)
        .then(res => {
             sState({...state, 
                date: res.data[0].rsdate,
                weight: res.data[0].weight,
                calories: res.data[0].calories,
                carbs: res.data[0].carbs,
                fats: res.data[0].fats,
                protein: res.data[0].protein,
                ra: res.data[0].ra,
                la: res.data[0].la,
                hw: res.data[0].hw,
                lw: res.data[0].lw,
                rl: res.data[0].rl,
                ll: res.data[0].ll,

                })

         })
        .catch(err => console.log(err.request));
    },[])
    
    


    return (
        <div>
                <div className='Progress-Details'>
                    <header className="progress-details-header">
                        <p className="progress-details-exit"  onClick={() => {
                            props.history.push("/progress")
                        }}>Back</p>
                        <p className="progress-details-title">Progress Details</p>
                      
                    </header>
                    <p className='progress-details-date'> Progress date {state.date}</p>
                    
              

                    <section className='progress-summary'>
                        <span className='progress-summary-title'>
                            Progress Summary
                        </span>
                        <div className='progress-summary-details'>
                            <div className='progress-summary-2'>
                            
          
                                <span>Calories: {state.calories}</span>
                                <span>Protein: {state.protein}</span>
                                <span>Carbs: {state.carbs}</span>
                                <span>Fats: {state.fats}</span>
                                </div>   
                                </div>
                                </section>          
                           
                            <div className='measurements-summary'>
                                <span className='measurements-summary-title'>
                                    Measurements  
                                </span>
                                <div className='measurements-summary-2'>
                                <span> Right Arm: {state.ra}</span>
                                 <span>Left Arm: {state.la}</span>       
                                 <span>High Waist: {state.hw}</span>         
                                 <span>Waist: {state.lw}</span>    
                                 <span>Right leg: {state.rl}</span>    
                                 <span>left leg: {state.ll}</span>
                                 <span>Weight: {state.weight}</span>     
                            </div>
                            </div>
                           
                   
                   

                    
                    <br></br>
                </div>
            </div>
    
    )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(ProgressDetails); 
