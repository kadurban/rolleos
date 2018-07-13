import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.css'

export default class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <NavLink to="/about" className="footer-link">
          <span>About RollEos</span>
        </NavLink>
        <NavLink to="/support" className="footer-link">
          <span>Support</span>
        </NavLink>
        <NavLink to="/terms" className="footer-link">
          <span>Terms</span>
        </NavLink>
        <br/>
        <span className="footer-copy">©2018 RollEOS. All Rights Reserved.</span>
      </div>
    )
  }
}