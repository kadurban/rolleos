import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class Support extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>Support</h5>

        <p>
          We payout all winning bets and/or refunds instantly. However, if for any reason, we were unable to send you Eos from either a win or a refund, you can resolve that with us here.
        </p>
        <p>
          Before emailing check your wallet address for recent transactions coming from us under the 'internal transactions' tab.
        </p>
        <p>
          If for any reason you still have not received a result 20 minutes after placing your bet, it is important that you do not place any more bets and that you contact support at <a
          href="mailto:support@Rolleos.com">support@Rolleos.com</a> with the following information:
        </p>
        <ol>
          <li>
            Your Eos wallet address
          </li>
          <li>
            Bet value
          </li>
          <li>
            A description of your issue
          </li>
          <li>
            The transaction ID.
          </li>
        </ol>
        <p>
          We aim to respond to support requests within 24 hours. We record the details of every roll into the blockchain, so we should always be able to resolve any issue that you may be experiencing.
        </p>

      </div>
    )
  }
}