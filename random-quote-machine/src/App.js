import './App.css';
import React, {Component} from 'react';
import * as quotesFile from './quotes.js'

let newQuote = quotesFile.randomQuote; 


class App extends React.Component{
	constructor(props){
 		super(props); 
 		this.state = {
 			quote:'Click "Get Quote" to generate new quote', 
 			author:"Author's name"
 		}
 	}
 	
 	newQuote(){
 		this.setState((state)=>({
 			quote: newQuote()["quote"], 
 			author: newQuote()["author"]
 		}))
 	}; 
 	
 	render(){
 		return(
    	<div className="App" id="quote-box">
      		<p id="text">{this.state.quote}</p>
      		<p id="author">{this.state.author}</p>
      		<button id="new-quote" onClick={this.newQuote.bind(this)}className="btn btn-primary">Get Quote</button>
  	  		<a href='twitter.com/intent/tweet' id="tweet-quote">Twitter</a> {/*Change this into a twitter quote*/}
    	</div>)
	}

}

export default App;
