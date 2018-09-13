import React, {Component} from 'react'
import { observer } from 'mobx-react'
import Slider from 'rc-slider';
import './Game.css'
import 'rc-slider/assets/index.css';

import gameStore from '../../store/game';
import appStore from '../../store/app';

@observer
export default class Game extends Component {
  async componentDidMount() {
    gameStore.setProfit()
  }

  render() {
    return(
      <form className="game" onSubmit={gameStore.roll}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <h2 className="game-title">Place your bet</h2>
            </div>
            <hr/>
            <div className="form-group">
              <div className="bet-size-control">
                <label>Bet size</label>
                <input className="form-control" type="text" value={gameStore.betSize} onChange={(e) => gameStore.setBet(e.target.value)}/>
                <div>
                  <Slider min={0.1} max={gameStore.maxBet} step={0.1}
                          onChange={(value) => gameStore.setBet(value)}
                          value={gameStore.betSize}/>
                </div>
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <div className="chance-control">
                <label>Chance of winning</label>
                <input className="form-control" type="text" value={gameStore.chance} onChange={(e) => gameStore.setChance(e.target.value)}/>
                <div>
                  <Slider min={1} max={98} step={1}
                          onChange={(value) => gameStore.setChance(value)}
                          value={gameStore.chance}
                          marks={{1: '1%', 50: '50%', 98: '98%'}}/>
                </div>
              </div>
            </div>
            <hr/>
            <div className="form-group results-preview">
              <div className="results-preview-chance">
                Roll under <span>{gameStore.chance + 1}</span> <br/>
              </div>
              <div className="results-preview-betsize">
                with a wager of <span>{gameStore.betSize} EOS</span> <br/>
              </div>
              <div className="results-preview-profit">
                for a profit of <span>{gameStore.profit} EOS</span>
              </div>
            </div>
            <button className="btn btn-warning btn-lg btn-block game-button" type="submit">
              {appStore.scatter ? (
                appStore.identity ? 'Roll' : 'Login'
              ) : (
                <small>Scatter wallet was not detected</small>
              )}
            </button>
          </div>
        </div>
      </form>
    )
  }
}