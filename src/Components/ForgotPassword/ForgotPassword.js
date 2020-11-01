import React,{useState} from 'react';
import axios from 'axios';
import '../../scss/ForgotPassword.scss';
import {Link} from 'react-router-dom';

function ForgotPassword(props) {
    const [state, sState] = useState({
        email: '',
    })
    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    }
    const sendEmail = () => {
        const {email} = state;
        axios
            .post('/api/email', {email})
            .then(() => {
                props.history.push('/')
                sState({email: ''})
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <header className='fpw-header'>
                    <Link className='fpw-link' to='/'>&#10094; BACK</Link>
            </header>
            <form className='fpw-box'>
                <h1 >Forgot Password</h1> 
                <span>Enter your account's email and we'll send you an email to reset the password</span>
                <input
                    className='fpw-input'
                    value={state.email}
                    name='email'
                    placeholder='Email Address'
                    onChange={(e) =>  handleInput(e)}/>
                <button 
                    className={state.email
                        ?'fpw-button change':'fpw-button'}
                    onClick={sendEmail}
                        >SEND EMAIL</button>
            </form>
        </div>
    )


}
export default ForgotPassword;
