import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class About extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>Play The Game</h5>
        <p><b>Our Eos dice game is provably-fair, has a low 1% house edge and no sign-ups or deposits. Best of all it has NO transaction fees as its built on the EOS blockchain.</b></p>
        <p>
          RollEos is an Eos smart contract for placing bets on our provably-fair dice game using Eos with no deposits or sign-ups. Each dice roll is provably random and cryptographically secure thanks to the nature of the Eos blockchain.
        </p>
      </div>
    )
  }
}