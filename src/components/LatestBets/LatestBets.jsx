import React, {Component} from 'react'
import { observer } from 'mobx-react'
import './LatestBets.css'

import latestBetsStore from '../../store/latestBets'

@observer
export default class LatestBets extends Component {
  componentDidMount() {
    latestBetsStore.wsClientInit()
  }

  render() {
    return(
      <div className="LatestBets">
        <h6 className="LatestBets-title">Latest bets</h6>
        <table className="table table-sm">
          <tbody>
          {latestBetsStore.bets.map((bet, i) =>
            <tr key={i}>
              <td>
                {bet.from} -> {bet.to} | {bet.quantity}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}