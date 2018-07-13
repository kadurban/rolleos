import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class SmartContract extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>Smart Contract</h5>
      </div>
    )
  }
}