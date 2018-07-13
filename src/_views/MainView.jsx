import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import Header from "../components/Header/Header";
import Game from "../components/Game/Game";
import Footer from "../components/Footer/Footer";
import Logo from "./eos-logo.png";


@observer
export default class MainView extends Component {
  componentDidMount () {
    document.title = this.props.title || 'Not Found'
  }

  componentDidUpdate () {
    document.title = this.props.title || 'Not Found'
  }

  render () {
    return (
      <div className="app-wrap">
        {/*<div className="row">
          <div className="col-12">
          </div>
        </div>*/}
        <div className="row">
          <div className="col-4">
            <div className="top-logo">
              <span className="logo-wrap">
                <img src={Logo} alt="ROLLEOS"/>
              </span> ROLLEOS
            </div>
            <Game/>
          </div>
          <div className="col-8">
            <Header/>
            <div style={{marginTop: '15px'}}>
              <Route {...this.props} render={history => <this.props.view {...history}/>}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Footer/>
          </div>
        </div>
      </div>
    )
  }
}
