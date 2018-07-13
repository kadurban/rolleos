import React, {Component} from 'react'
import { observer } from 'mobx-react'

@observer
export default class Faq extends Component {
  render() {
    return (
      <div>
        <h5 style={{marginBottom: '20px'}}>FAQ</h5>
        <p>
          RollEos enables individuals to place bets and choose their own odds, on the result of a 100-sided dice roll, without sign-ups or user deposits, using Eos – soon to be the most popular cryptocurrency in the world.
        </p>
        <p>
          Rolleos is an Eos smart-contract and Dapp which provides a provably-fair dice game leveraging the distributed power of transparent smart-contracts to decentralize its codebase whilst exposing an intuitive web-based interface to players.
        </p>
        <b>
          How does it work?
        </b>
        <p>Rolleos is based on an Eos smart contract. It is executed by the Eos network, which enables it to operate in a partially decentralized fashion to provide a transparent, provably fair gambling service.</p>
        <p>Our random number is the only external dependency for our smart-contract as the nature of blockchains make it unsafe for us (not you) to calculate random data inside the blockchain in a secure way.</p>
        <p>
          Once our Eos smart contract receives a random number from random.org, the results are calculated against the number you submitted and winning bets are paid out instantly.
        </p>
        <b>
          What is the house edge?
        </b>
        <p>
          Our house-edge is a low 1%.
        </p>
        <b>
          Why can't I place a bet?
        </b>
        <p>
          To place a bet first you will need to install Scatter and sync to the best block on the Eos network. For details on how to install Scatter, please visit our 'How to Play' tab.
        </p>
        <b>
          Is it provably-fair?
        </b>
        <p>
          Rolleos is 100% provably-fair. We don't use the number returned from random org as our final number (which means in the remote edge-case chance there is ever a rogue employee at random org, they will not be able to exploit our game, as they do not control our final number), on top of this, we keep our oracle honest by recording the serial numbers returned from our random org responses (which increment by 1 for each response). This means our oracle cannot cheat us or our players without it being detected by submitting multiple requests to random org and only submitting suitable results along with their corresponding TLSNotary proof (TLSNotary proof alone is not enough, because the oracle could simply make multiple requests). Our system is 100% provably-fair. Anybody can view the serial number responses by watching event filters in Eos Wallet, coupled with the corresponding TLSNotary proofs. Of course, you can always browse the source code of our smart-contract under the 'Smart Contract' tab as well as check the verification link to ensure our code does exactly what we say it does. Our game is 100% provably-fair and it is something we are very proud of.
        </p>
        <p>
          We aim to respond to support requests within 24 hours. We record the details of every roll into the blockchain, so we should always be able to resolve any issue that you may be experiencing.
        </p>
        <b>
          How to contact us?
        </b>
        <p>
          For all contact queries email us at support@rolleos.com We aim to respond to all queries within 24 hours.
        </p>

      </div>
    )
  }
}