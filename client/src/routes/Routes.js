
import React from 'react';
import Footer from '../components/Footer_/Footer';
import Main_ from '../pages/Main/Main';

import {BrowserRouter , Switch, Route, Link} from 'react-router-dom';// npm i react-router-dom

function Routes() {
  return (

  <BrowserRouter>
   
    <Switch>
        
  {/*
  <Link to='/home'></Link>
  */}  
   {/*<Route exact path="/" component={Login} />*/} 
 <Route exact path="/" component={Main_} /> 


    </Switch>

   
  </BrowserRouter>


  );
}

export default Routes;