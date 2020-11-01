import React, {useState, useEffect} from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../../scss/progress.scss';
import { getProgress } from '../../ducks/mreducer';

function Progress(props){
    const[state, sState] = useState({
    searchPost:'',
    editPost:'',
    deletePost:''
    })
    
    useEffect(() => {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
        else{
            getProgress();
        }
    },[]);

    const getProgress = () => {
        const {search} = state;
        axios.get(`/api/progress?search=${search}`)
        .then(res => sState({...state, progress: res.data}))
        .catch(err => console.log(err))
    }

    const handleSearch = (search) => {
        sState({...state, search: search})
    }
    const resetSearch = () => {
        sState({...state, search: ''})
        getProgress();
    }
    // let mappedProgress = state.progress
    //     .map( el => {
    //     return (
    //         <Link className='progress' to={`/entry/${el.cust_id}`} key={el.cust_id}>
    //                 <span className='progress-dt'>{el.date[0]}</span>
    //         </Link>)})
    

        return(
            <div className='progress2'>
                <header className='dash-header'>
                    <div className='dash-header-cont'>
                                <span className='Progress'>{props.mreducer.user.first_name}Progress</span>
                            </div>
                            
                        
                        <div className='search-flex'>
                            <input
                                value={state.search}
                                onChange={(e) =>  handleSearch(e.target.value)}
                                placeholder='Search by Date'
                                />
                            <button onClick={getProgress} className='search-button'>Reset</button>
                            <button onClick={resetSearch} className='reset-button'>Edit</button>
                        </div>
                    


                 </header>
                <div className='dashboard-table'>
                    <div className='table-header'>
                        <span className='progress-date'>Date Created</span>  
                    </div>
                    {/* {mappedProgress} */}
                </div>
            </div>
        );
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Progress);