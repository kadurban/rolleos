import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './LangSelector.css'

@observer
export default class LangSelector extends Component {
  render () {
    let langKeys = Object.keys(langs)

    return(
      <div className="LangSelector">
        {/*<span className="LangSelector-label">{str('Language')}:</span>*/}
        <div className="LangSelector-wrap-inner">
          <img className="LangSelector-flag" src={`/flags/4x3/${this.flag()}.svg`} alt={langs[store.user.lang].native}/>
          <select className="LangSelector-select form-control" onChange={store.user.changeLang} defaultValue={store.user.lang}>
            {langKeys.map((lang, i) => <option key={i} value={lang}>{langs[lang].native}</option>)}
          </select>
        </div>
      </div>
    )
  }

  flag() {
    switch (store.user.lang) {
      case 'en': return 'gb'
      default: return store.user.lang
    }
  }
}