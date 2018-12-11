import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import locationProvider from './locationprovider'
import httpClient from './httpclient'
import settings from './settings'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {searchText: '', location: null, results: [], headerClass: 'App-header'};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    
      locationProvider.loadPosition().then((location) => {
        this.setState({location: location});
      });
    
  }

  formatAddress () {
    if (!this.state.location) {
      return "...";
    } else if (this.state.location.error || !this.state.location.address) {
      return "Unknown";
    } else {
      return this.state.location.address.formattedAddress;
    }
  }

  handleChange(event) {
    let searchText = event.target.value;
    if (searchText && searchText.length > 3) {
      // uncomment this code when search API is ready
      // let apiUrl = settings.searchApiUrl.replace("{{searchText}}", searchText);
      // httpClient.get(apiUrl).then((response) => {
      //  let results = JSON.parse(response);
      //  this.setState({headerClass: 'App-header-results', results: results});
      //});
      // For now, lets use dummy result
      let res = [];
      res.push("No results found for " + searchText);
      this.setState({headerClass: 'App-header-results', results: res});
    }
  }

  render() {
    return (
      <div className="App">
        <header className={this.state.headerClass}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Search and Recommendor system.
          </p>
          <div>
          <input type="text" className="sarstext" onChange={this.handleChange} />
          </div>
          <div className="location">Location: {this.formatAddress()} </div>
        </header>
        <div className="results">
          {this.state.results.map(result => (
            <div className="resultText">{result}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
