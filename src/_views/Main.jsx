import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class Main extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>About RollEos</h5>
        <p><b>Our Eos dice game is provably-fair, has a low 1% house edge and no sign-ups or deposits.</b></p>
        <table className="table table-bordered">
          <tbody>
          <tr>
            <td>EOS wagered</td>
            <td>EOS won</td>
            <td>games rolled</td>
          </tr>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          </tbody>
        </table>
        <p>RollEos is an Eos smart contract for placing bets on our provably-fair dice game using Eos with no deposits or sign-ups. Each dice roll is provably random and cryptographically secure thanks to the nature of the Eos blockchain.</p>
      </div>
    )
  }
}