import React, {Component} from 'react'
import { observer } from 'mobx-react'
import './PopUp.css'

@observer
export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: props.shown || true
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    console.log('outside')
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose()
    }
  }

  render () {
    return(
      this.state.shown ?
        <div ref={this.setWrapperRef} className={`popup ${this.props.className}`} style={{display: 'block'}}>
          {this.props.children}
        </div>
      : null
    )
  }
}