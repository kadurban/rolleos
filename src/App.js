import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { ToastContainer, Slide } from 'react-toastify'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Loader from './components/Loader/Loader'
import './index.css'
import NotFound from './_views/NotFound'
import MainView from './_views/MainView';
import { Switch, withRouter } from 'react-router-dom';
import Main from './_views/Main'
import SmartContract from './_views/SmartContract'
import Results from './_views/Results'
import About from './_views/About'
import Terms from './_views/Terms'
import HowToPlay from './_views/HowToPlay'
import Support from './_views/Support'
import Faq from './_views/Faq'

@withRouter
@observer
export default class App extends Component {
  async componentDidMount () {
    setTimeout(() => store.app.loading = false, 0)
    store.app.ensureScatter()
  }

  render () {
    if (store.app.loading) return <Loader overlay={true}/>
    return (
      <ErrorBoundary>
        <Switch>
          <MainView exact path='/' view={ Main } title={'About RollEos'}/>
          <MainView path='/results' view={ Results } title={'Results'}/>
          <MainView path='/how-to-play' view={ HowToPlay } title={'Play The Game'}/>
          <MainView path='/faq' view={ Faq } title={'FAQ'}/>
          <MainView path='/smart-contract' view={ SmartContract } title={'Smart Contract'}/>

          <MainView path='/about' view={ Main } title={'About Eosroll'}/>
          <MainView path='/support' view={ Support } title={'Support'}/>
          <MainView path='/terms' view={ Terms } title={'Terms'}/>
          <MainView view={ NotFound } title={'Not Found'} />
        </Switch>
        {ReactDOM.createPortal([
          <ToastContainer autoClose={8000} position={toast.POSITION.BOTTOM_RIGHT} transition={Slide} key="ToastContainer"/>
        ], document.getElementById('modals'))}
      </ErrorBoundary>
    )
  }

}

