import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import app from './store/app'
import game from './store/game'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

window.store = {
  app, game
}

window.toast = toast

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('root')
)
