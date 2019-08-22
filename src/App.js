import React from 'react';
import { Component } from 'react';
import DataChart from './DataChart';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';


class App extends Component {
  state = {
    data: null
  };

  //to load existing data on render
  componentDidMount() {
    this.loadData();
  }

  isInsideChromePopup() {
    return window.location.search.includes('popup=true');
  }

  //load data from chrome storage
  loadData() {
    if (!this.isInsideChromePopup()) {
      return;
    }

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

  //invoke when start tracking button is clicked
  handleStartTracking = () => {
    if (!this.isInsideChromePopup()) {
      return;
    }

    let getInfo = {
      populate: true
    };

    // eslint-disable-next-line no-undef
    chrome.windows.getCurrent(getInfo, getCurrentTab);

    function getCurrentTab(window) {
      //check and take actions if we changed to tab we don't track
      let currentTab = window.tabs.find(tab => tab.active === true);
      let message = {
        type: "START_TRACKING",
        url: currentTab.url,
        windowId: currentTab.windowId
      };
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage(message);
    }
  }

  handleClearAllData = () => {
    //tell chart to destroy itself
    this.setState({
      data: null
    });

    if (!this.isInsideChromePopup()) {
      return;
    }

    let message = {
      type: "CLEAR_TRACKING_DATA"
    };
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(message);

  }


  render() {
    return (
      <Jumbotron>
      <h2>Argus</h2>
      <p class="card-text">Website time-tracking assistant</p>
      <p>
      <Button variant="success" onClick = {this.handleStartTracking}>Start Tracking</Button>
      <Button variant="warning" onClick = {this.handleClearAllData}>Clear All Data</Button>
     </p>
     <p>
     {
       this.state.data !== null &&
       <DataChart data={this.state.data} />
     }
     </p>
    </Jumbotron>
    );
  }

}

export default App;
