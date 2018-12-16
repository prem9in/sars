import React, { Component } from 'react';
import logo from './logo.svg';
import SearchButton from './searchbutton.jpg';
import './App.css';
import locationProvider from './locationprovider'
import httpClient from './httpclient'
import settings from './settings'
import SearchResultsView from './searchresultsview'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {location: null, text: '', city: '', state: '', results: [], headerClass: 'App-header'};

    this.handleChange = this.handleChange.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handlego = this.handlego.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    
      locationProvider.loadPosition().then((location) => {
        let lcity = '';
        let lstate = '';
        if (location && location.address) {
            if (location.address.adminDistrict) {
              lstate = location.address.adminDistrict
            }
            if (location.address.locality) {
               if (location.address.formattedAddress.indexOf(location.address.locality) > 0) {
                 lcity = location.address.locality;
               } else {
                  let splitAddress = location.address.formattedAddress.split(",")
                  if (splitAddress.length > 1) {
                    lcity = splitAddress[splitAddress.length - 2];
                  }
               }
            }
        }

        this.setState({location: location, city: lcity, state: lstate});
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

  changeCity(event) {
     let searchCity = event.target.value;
     if (searchCity && searchCity.length > 2) {
          this.setState({city: searchCity});
      }
  }

  changeState(event) {
     let searchState = event.target.value;
      if (searchState && searchState.length > 1) {
          this.setState({state: searchState});
      }
  }

  handleChange(event) {
    let searchText = event.target.value;
    if (searchText && searchText.length > 2) {
      this.setState({text: searchText});
    }
  }

  onKeyPress(event) {
    if (event.key === 'Enter'){
        this.handlego(event);
    }
  }

  handlego(event) {
    if (this.state.text && this.state.text.length > 2) {
       let apiTargetUrl = settings.searchUrlTemplate
                      .replace("{{endpoint}}", settings.searchApiTargetUrl)
                      .replace("{{searchtext}}", this.state.text.trim())
                      .replace("{{searchcity}}", (this.state.city || "Pittsburgh").trim())
                      .replace("{{searchstate}}", (this.state.state || "PA").trim());

      httpClient.get(settings.searchApiUrl, apiTargetUrl).then((response) => {
          let results = JSON.parse(response);
          this.setState({headerClass: 'App-header-results', results: results});
       });
    }
  }


  renderSearch() {
    var buttonStyle = {
        backgroundImage: 'url(' + SearchButton + ')',
        WebkitTransition: 'all',
        msTransition: 'all' 
      };

    return ( 
        <header className={this.state.headerClass}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="title">
            Search and Recommendor system
          </div>
          <div>
          <div className="searchTextCont"><input type="text" placeholder="Search text" className="sarstext" onKeyPress={this.onKeyPress} onChange={this.handleChange} /> </div>
          <div className="searchButtonCont" onClick={this.handlego}> <div style={buttonStyle} className="searchButton" onClick={this.handlego}></div> </div>
          </div>
          <div className="location">Detected location: {this.formatAddress()} </div>
         <div className="location">Provide a different location: </div>
          <div>
          <input type="text" placeholder="City" className="citytext" onChange={this.changeCity} value={this.state.city} />
          <input type="text" placeholder="State" className="statetext" onChange={this.changeState} value={this.state.state} />
          </div>
        </header>
      );
  }


  renderResults(results, title, errorTitle) {
      if (results && results.length > 0) {
         return (<div> 
         <div className="resultLabel"> {title} </div>
         <div className="recommendations">         
           {results.map(result => 
             <SearchResultsView item={result} key={result.business_id}></SearchResultsView>
          )}
        </div>
        </div>
        );
     } else if (results && results.length === 0) {
        return ( <div>
           <div className="resultLabel"> {title} </div>
           <div className="noresults"> {errorTitle} </div>
           </div> );
     } else {
        return null;
     }
  }


  render() {

     return (
      <div className="App">
        {this.renderSearch()}
        <div className="resultsPane">
         <div className="table">
        <div className="left">        
        {this.renderResults(this.state.results.searchResults, "Search results", "No search results are available for query '" + this.state.text +"' and location '" + this.state.city + ", " + this.state.state + "'.")}
        </div>
         <div className="right">
        {this.renderResults(this.state.results.recommendations, "System recommendations", "No system recommendations are available for query '" + this.state.text +"' and location '" + this.state.city + ", " + this.state.state + "'.")}
         </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
