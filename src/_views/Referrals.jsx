import React, {Component} from 'react'
import { observer } from 'mobx-react'
import getAccountName from "../lib/getAccountName";
import appStore from "../store/app";

@observer
export default class Referrals extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6 offset-3">
          <div className="input-group">
            <input type="text" className="form-control" defaultValue={`https://qwerty.com/?ref=${appStore.identity ? getAccountName(appStore.identity) : ''}`}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Copy</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}