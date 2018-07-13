import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class HowToPlay extends Component {
  render() {
    return (
      <div>

        <h5 style={{marginBottom: '20px'}}>Play The Game</h5>
        <p>
          You are betting on the result of a 100 sided dice roll. The result of the dice roll is bounded to 1-100. To win, the dice result needs to be lower than your number. If the dice result is lower than your number you win!
        </p>
        <ol>
          <li>
            Set your bet size (units of Eos).
          </li>
          <li>
            Adjust the 'chance of winning' slider to change your percentage chance of winning.
          </li>
          <li>
            To win, the dice result needs to be lower than your number.
          </li>
          <li>
            Click 'ROLL'
          </li>
          <li>
            If the result of the dice roll is lower than your 'Roll under' number, you win immediately!
          </li>
        </ol>

        <h5>Play Using Scatter or Firefox</h5>
        <p>
          To place a bet using Scatter
        </p>
        <ol>
          <li>
            If you haven't already, download and install Scatter. (Please add Hyperlink)
          </li>
          <li>
            Enable the extension and sign in to your Scatter account.
          </li>
          <li>
            Using the Chrome or Firefox browser visit RollEos.
          </li>
          <li>
            Adjust your bet size and % chance to win on the home page.
          </li>
          <li>
            Click roll to confirm your bet with Scatter.
          </li>
          <li>
            Good luck!
          </li>
        </ol>

        <h5>Play Using Your Mobile</h5>
        <p>
          We’ll let you know as soon as you can.
        </p>

      </div>
    )
  }
}