import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Progress from './Components/Progress/Progress';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Measurements from './Components/Measurements/Measurements'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/progress' component={Progress} />
        <Route path='/new' component={Form} />
        <Route path='/forgotpassword' component={ForgotPassword}/>
        <Route path='/measure' component={Measurements}/>
    </Switch>
)