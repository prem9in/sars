import React, { Component } from 'react';
import './App.css';


class RecommendationsView extends Component {

  getSentiment() {
  	let sentiment = this.props.item.sentiment.substring(0, 4);
  	let sentimentScore = parseFloat(sentiment);
  	let classname = "positive";
  	if (sentimentScore <= 0.6 && sentimentScore >= 0.4) {
  		classname = "neutral";
  	} else if (sentimentScore < 0.4) {
  		classname = "negative";
  	}

  	return {
  		score: sentimentScore,
  		style: classname
  	}
  }

  render() { 
  	let sentimentData = this.getSentiment();	
  	return (
  		<div className="recommendationsview">
  			<div className="businessData">
	  			<div className="businessName">{this.props.item.name}</div>
	  			<div className="addressName">{this.props.item.address}, {this.props.item.city}, {this.props.item.state}</div>
	  		</div>
  			<div className="sentimentData">  				
  				Sentiment score
  				<div className={sentimentData.style}>{sentimentData.score}</div>
  			</div> 			
  		</div>
  	);
  }

}


export default RecommendationsView;