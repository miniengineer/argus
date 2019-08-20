import React from 'react';
import { Component } from 'react';

import DataChart from './DataChart';
import { onlyRunWhen } from './util/functions';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.loadData = onlyRunWhen(this.loadData, this.isInsideChromePopup);
  }

  state = {
    data: {
      'https://medium.com': 10,
      'https://facebook.com': 50
    }
  };

  componentDidMount() {
    if (this.isInsideChromePopup()) this.loadData();
  }

  isInsideChromePopup() {
    return window.location.search.includes('popup=true');
  }

  loadData() {
    let message = {
      type: "GET_TRACKING_DATA"
    };

    const responseCallback = (response) => {
      this.setState({
        data: response
      }) 
    }
  
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(message, responseCallback);
  }

  render() {
    return (
      <div>
        <DataChart data={this.state.data} />
      </div>
    );
  }
}

export default App;
