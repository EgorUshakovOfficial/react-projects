import './App.css';
import React, {Component} from 'react'; 
// import * as operations from './operations.js'
let allOpers = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '/', 
				'0', '.', '*'];
const operObj = { 
	'0': 'zero',
	'1':'one', 
	'2':'two', 
	'3':'three', 
	'4':'four', 
	'5': 'five', 
	'6': 'six', 
	'7': 'seven', 
	'8': 'eight', 
	'9': 'nine', 
	'=': 'equals', 
	'.': 'decimal', 
	'+': 'add', 
	'-': 'subtract', 
	'*': 'multiply', 
	'/': 'divide', 
	'C': 'clear'
}

class App extends React.Component{
  constructor(props){
  	super(props); 
  	this.state = {
  		total:'0', 
  		operations:[], 
  		numbers: [], 
  	}
  }

  handleChange(event){
  	// let regex = /^(0{2,}|0[-\+\*\.\/C])/;
  	// let numRegex             = /^(([1-9](\.?\d+)?)|(0\.\d*)|0$)/; // Checks if number is valid 
  	let numRegex                 = /^(([1-9]\d*\.?)|(0\.))\d*[-\+\*\/]*$/
  	if (this.state.total==='0' && numRegex.test(event.target.value)) {
  		this.setState({
  			total:event.target.value
  		})
  	}
  	else{
	  	let newStr               = this.state.total + event.target.value; 
	  	let lenNewStr 			 = newStr.length;
	  	let operRegex            = /[-\+\*\/]/;  //Operations regex used for splitting new string  
	  	let allNums              = newStr.split(operRegex).filter(elem=>elem!=""); 
	  	let areValidNumbers      = (allNums.filter(elem=>numRegex.test(elem)).length === allNums.length);
	  	let isNotLastOperConsec  = (/[-\+\*\/]{2}/).test(newStr.substring(lenNewStr-2))===false; 
	  	if (areValidNumbers){
	  		if (isNotLastOperConsec){
	  			this.setState({
	  			total: newStr
	  		  })
	  		}

	  		else if (newStr.substring(lenNewStr-1)==="-"){
	  			this.setState({
	  				total: newStr
	  		  })
	  		}

	  		else if (newStr[lenNewStr-2]==="-"){
	  			console.log(newStr);
	  			this.setState({
	  				total: newStr.substring(0, newStr.length-3) + newStr.substring(newStr.length-1)
	  			})
	  		}

	  	}
  	}
}
  clearOutput(){
  	this.setState({
  		total:'0', 
  		operations:[], 
  		numbers: []
  	})
  }

  performCalculation(){
  	this.setState({
  		total:String(eval(this.state.total))
  	});
  }

  render(){
  	return (
    	<div id="calc-container">
    		<div id="display">{this.state.total}</div>
    		{allOpers.map(elem=>{
    			return <button value={elem} onClick={this.handleChange.bind(this)}id={operObj[elem]}>{elem}</button>
    		})}
    		<button onClick={this.clearOutput.bind(this)}id={operObj['C']}>C</button>
    		<button onClick={this.performCalculation.bind(this)}id={operObj['=']}>{'='}</button>
    	</div>
  	 );
   }
}




export default App;
