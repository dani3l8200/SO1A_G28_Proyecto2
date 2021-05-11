import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes/Routes";
import reportWebVitals from './reportWebVitals';
import './index.css'
import Footer from './components/Footer_/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';  // npm install react-bootstrap bootstrap

ReactDOM.render(
  <React.StrictMode>

    <div className="fondo">  <Routes /> </div>
  <Footer/>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
