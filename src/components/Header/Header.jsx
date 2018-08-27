import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react'
import getAccountName from '../../lib/getAccountName'
import './Header.css'

import appStore from '../../store/app'

export default class Header extends Component {
  render() {
    return(
      <div className="header">
        <AccountInfo/>

        <nav className="nav">
          <NavLink exact to="/" className="nav-link" style={{paddingLeft: 0}}>
            <span>Play now</span>
          </NavLink>
          {/*<NavLink to="/results" className="nav-link">
            <span>Results</span>
          </NavLink>*/}
          {/*<NavLink to="/smart-contract" className="nav-link">
            <span>Smart Contract</span>
          </NavLink>*/}
          <NavLink to="/how-to-play" className="nav-link">
            <span>How to Play</span>
          </NavLink>
          <NavLink to="/faq" className="nav-link">
            <span>FAQ</span>
          </NavLink>
          <NavLink to="/referrals" className="nav-link">
            <span>Referrals</span>
          </NavLink>
        </nav>
      </div>
    )
  }
}

@observer
class AccountInfo extends Component {
  render() {
    return(
      <div className="float-right account_info">
        {appStore.identity ? (
          <span>{getAccountName(appStore.identity)}</span>
        ) : (
          'No account selected'
        )}
      </div>
    )
  }
}
