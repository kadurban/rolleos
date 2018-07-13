import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class Results extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>Results</h5>
      </div>
    )
  }
}