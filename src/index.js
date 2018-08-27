import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

window.toast = toast

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
