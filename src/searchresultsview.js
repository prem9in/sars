import React, { Component } from 'react';
import './App.css';
import Star from './star.png';


class SearchResultsView extends Component {

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

  getStar(starCount) {
     let stars = []
     for (let index = 0; index < starCount; index++) {
        stars.push(<img src={Star} className="star" alt="star" key={"img"+index} />);
      }
      return stars;
  }

  getStars() {
    let stars = this.props.item.averageUserRating;
    let rcounts = this.props.item.reviewCount;
    if (stars) {
      let starCount = parseFloat(stars);
      return (
         <div className="ratingcontainer">
          <span className="ratings">Average rating by <b>{rcounts}</b> people </span> 
          <span className="starcontainer"> {this.getStar(starCount)} </span>
          </div>
        );
    } else {
      return null;
    }
  }

  render() {
  	let sentimentData = this.getSentiment();	
  	return (
  		<div className="searchview">
  			<div className="businessData">
	  			<div className="businessName">{this.props.item.name}</div>
	  			<div className="addressName">{this.props.item.address}, {this.props.item.city}, {this.props.item.state}</div>
          {this.getStars()}
	  		</div>
  			<div className="sentimentData">  				
  				Sentiment score
  				<div className={sentimentData.style}>{sentimentData.score}</div>  				
  			</div>
  		</div>
  	);
  }

}


export default SearchResultsView;