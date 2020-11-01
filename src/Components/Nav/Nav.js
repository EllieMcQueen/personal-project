import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { logoutUser } from '../../ducks/reducer'


import homeLogo from './home.png'
import newLogo from './form.png'
import logout from './logout.png'
import fruit from './fruit.png'
import prLogo from './prlogo.jpeg'
import "../../scss/navv.scss"



function Nav(props){
    if(props.location.pathname !== '/') {
        console.log('nav', props)
        return(  
            <section className='nav_profile_container '>
           
               
                 
                    <p>{props.username}</p>
                
                <div className='nav_links'>
                    <Link to='/dashboard'><img className='nav_img' src={homeLogo} alt='home' /></Link>
                    <Link to='/measure'><img className='nav_img' src={newLogo} alt='new post' /></Link>
                    <Link to='/progress'><img className='nav-img' src={prLogo} alt='progress' /></Link>
                    <Link to='/' onClick={props.logout}><img className='nav_img' src={logout} alt='logout' /></Link>
                </div>
            
            </section>
        )
    } else {
        return null
    }
}
function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { logoutUser })(Nav))
