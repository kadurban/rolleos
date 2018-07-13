import React, {Component} from 'react'
import { observer } from 'mobx-react'
import Slider from 'rc-slider';
import './Game.css'
import 'rc-slider/assets/index.css';

@observer
export default class Game extends Component {
  componentDidMount() {
    store.game.setProfit()
  }

  render() {
    return(
      <form className="game" onSubmit={store.game.roll}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <h2 className="game-title">Place your bet</h2>
            </div>
            <hr/>
            <div className="form-group">
              <div className="bet-size-control">
                <label>Bet size</label>
                <input className="form-control" type="text" value={store.game.betSize} onChange={(e) => store.game.setBet(e.target.value)}/>
                <div>
                  <Slider min={0.1} max={store.game.maxBet} step={0.1}
                          onChange={(value) => store.game.setBet(value)}
                          value={store.game.betSize}/>
                </div>
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <div className="chance-control">
                <label>Chance of winning</label>
                <input className="form-control" type="text" value={store.game.chance} onChange={(e) => store.game.setChance(e.target.value)}/>
                <div>
                  <Slider min={1} max={98} step={1}
                          onChange={(value) => store.game.setChance(value)}
                          value={store.game.chance}
                          marks={{1: '1%', 50: '50%', 98: '98%'}}/>
                </div>
              </div>
            </div>
            <hr/>
            <div className="form-group results-preview">
              <div className="results-preview-chance">
                Roll under <span>{store.game.chance + 1}</span> <br/>
              </div>
              <div className="results-preview-betsize">
                with a wager of <span>{store.game.betSize} EOS</span> <br/>
              </div>
              <div className="results-preview-profit">
                for a profit of <span>{store.game.profit} EOS</span>
              </div>
            </div>
            {store.app.scatter ? (
              <button className="btn btn-warning btn-lg btn-block game-button" type="submit">
                Roll
              </button>
            ) : (
              <button className="btn btn-warning btn-lg btn-block game-button" type="submit" disabled={true}>
                Roll
                <br/>
                <small>
                  Scatter wallet was not detected
                </small>
              </button>
            )}
          </div>
        </div>
      </form>
    )
  }
}