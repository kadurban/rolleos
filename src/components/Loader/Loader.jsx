import React, {Component} from 'react'
import './Loader.css'

export default class Loader extends Component {
  render() {
    return(
      <div className={`loader ${this.props.overlay ? 'overlay' : ''}`}>
        <div className="loader-spinner"/>
        {this.props.title ?
          <div className="loader-title">
            {this.props.title}
          </div>
        : null}
      </div>
    )
  }
}