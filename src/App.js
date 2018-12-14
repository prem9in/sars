import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import locationProvider from './locationprovider'
import httpClient from './httpclient'
import settings from './settings'
import SearchResultsView from './searchresultsview'
import RecommendationsView from './recommendationsview'


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
      let apiUrl = settings.searchUrlTemplate
                      .replace("{{endpoint}}", settings.searchApiUrl)
                      .replace("{{searchtext}}", searchText)
                      .replace("{{searchcity}}", "Pittsburgh")
                      .replace("{{searchstate}}", "PA");
      httpClient.get(apiUrl).then((response) => {
          let results = JSON.parse(response);
          this.setState({headerClass: 'App-header-results', results: results});
       });
      // For now, lets use dummy result
      // let res = [];
      // res.push("No results found for " + searchText);
      // this.setState({headerClass: 'App-header-results', results: res});
    }
  }


  renderSearch() {
    return ( 
        <header className={this.state.headerClass}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Search and Recommendor system
          </p>
          <div>
          <input type="text" className="sarstext" onChange={this.handleChange} />
          </div>
          <div className="location">Location: {this.formatAddress()} </div>
        </header>
      );
  }

  renderSearchResult(resultsAvailable) {
     if (resultsAvailable) {
         return (<div className="results">          
            {this.state.results.searchResults.map(result => 
              <SearchResultsView item={result}></SearchResultsView>
            )}
          </div>
        );
     } else {
        return null;
     }
  }

  renderRecommendations(recommendationsAvailable) {
     if (recommendationsAvailable) {
         return (<div className="recommendations">         
           {this.state.results.recommendations.map(result => 
            <RecommendationsView item={result}></RecommendationsView>
          )}
        </div>
        );
     } else {
        return null;
     }
  }

  render() {

    let resultsAvailable = this.state.results && this.state.results.searchResults && this.state.results.searchResults.length > 0;
    let recommendationsAvailable = this.state.results && this.state.results.recommendations && this.state.results.recommendations.length > 0;
    return (
      <div className="App">
        {this.renderSearch()}
        <div className="resultsPane">
         <div className="table">
        <div className="left"> 
        <div className="resultLabel">
         Search results
         </div>       
        {this.renderSearchResult(resultsAvailable)}
        </div>
         <div className="right">
         <div className="resultLabel">
         System recommendations
         </div>
        {this.renderRecommendations(recommendationsAvailable)}
         </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
