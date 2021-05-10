import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes/Routes";
import reportWebVitals from './reportWebVitals';
import './index.css'


ReactDOM.render(
  <React.StrictMode>
       
          <div className="fondo">  <Routes /> </div>  
       

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
