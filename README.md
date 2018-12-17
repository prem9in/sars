# Search and Recommendation system

Adhoc search is one of the most common scenarios to satisfy users need. We want to build a
search and recommendation system for user queries related to local business. The main goal
was to fulfil the need of the user and satisfy the user query with corresponding results.
The review data associated with the business is a rich information source that can be mined
and used to infer meaning, business attributes, and sentiment. We will implement sentiment
analysis for the reviews of the business and extract top positive and top not so positive reviews. We will scope our **search and recommendation system** to “*Restaurants*” segment. For example if user searches for *pet friendly*
*restaurant with good Indian food near Bothell*, we should be able to suggest existing
pet friendly Indian restaurants in Bothell.



We analyzed the data for local business and reviews from :
<https://www.kaggle.com/yelp-dataset/yelp-dataset>

The goal was to pick one location which has medium size business review dataset. The date for state of **Pennsylvania** was a perfect fit for this project. This has around 10,000 local businesses with around 260,000 reviews.



The project is working end to end and an UX interface is hosted at
https://sars.azurewebsites.net/index.html



The project is primarily composed of two parts.

- Topic modelling and Sentiment analysis.
- An API providing search capabilities and UX interface for demo.



Let's understand these components in detail.

## Search and Recommendation system - UX

This section covers the UX component of the project. 

## Introduction

A UX is responsible for getting users query and their location and invoke API to get search and recommendations. This is the interface with which users can interact with the system.

UX is a single page web application implemented in *React*.



### Project files

Here are details of all code files and project structure.

Project is scaffolded using *`create-react-app`* command on *node*. The code files are in *src* folder.

| File/Folder                 | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| App.css                     | css Style file for UX.                                       |
| App.js                      | Application main file. Displays the input form, handle all user interaction and display results. |
| httpclient.js               | JS class for HTTP client for making XMLHttpRequest.          |
| index.css                   | React template css file                                      |
| index.js                    | React template index file                                    |
| locationprovider.js         | JS class for providing user current location using bing maps api. |
| logo.svg                    | logo for UX                                                  |
| searchresults.js            | View for rendering individual search results.                |
| settings.js                 | Configuration file for UX.                                   |
| searchbutton.png            | Image for search.                                            |
| star.png                    | Image for rating star.                                       |
| All other files and folders | All other files and folders are generated by React template or is being used for deployment to Azure cloud. |



#### Configuration

Configuration for UX is in file `settings.js`

Here is the description for all configuration settings

| Configuration     | Data type | Description                                                  |
| ----------------- | --------- | ------------------------------------------------------------ |
| bingmapsApiUrl    | string    | Bing Maps API url for getting location data.                 |
| bingmapsApiKey    | string    | Bing Maps API key... hashed out for security reasons.        |
| searchApiUrl      | string    | Url to sars API which we have implemented as part of this project. |
| searchUrlTemplate | string    | Template for query parameters for API call.                  |



#### UX workflow

UX has basically a form for capturing user input for query term as well as location information.

At start UX tries to detect user location using bing maps location rest APIs. When UX is loaded user can enter desired query and provide a location. User can then hit Enter or press the search button.

This triggers a call to sars API and when response from API is received the results are displayed in two columns. One for search results and other for recommendations from the system.



#### Installation

Clone this repository to a folder and ensure latest stable version of Node and npm is installed on system

Now let's install all required *node_modules* are installed. 

```shell
node install .
```

Once all packages are installed then simply execute the following to get local UI running.

```shell
npm start
```

This kicks off the UX at port 3000.



##### That's it. 

We have hosted our UI on Azure cloud at https://sars.azurewebsites.net/index.html .



