//no state no methods

import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import '../src/scss/navv.scss';

function App(props) {
  return (
    <div className="App">
        {props.location.pathname !== '/'    
          ? <Nav />
          : null}
      {routes}
    </div>
  );
}

export default withRouter(App);
