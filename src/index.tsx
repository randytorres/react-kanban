import React from 'react'
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppContainer from './app/components/AppContainer'
import reportWebVitals from './reportWebVitals'

import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
