import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class NotFound extends Component {
  render() {
    return (
      'not-found...'
    )
  }
}