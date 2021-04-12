import './App.css';
import React, {Component} from 'react'; 

class App extends React.Component{

  constructor(){
    super();
    this.timer = undefined;
  }
  
  state = {
    break:5, 
    session:25, 
    isRunning: false, 
    timeDisp: "25:00", 
    total: 30*60,
    typeSess: "Session"
  }

  decreBreak(){
    if (this.state.isRunning!==true && this.state.break > 1){
      this.setState((state)=>({break: state.break-1, 

      total: (state.session+state.break-1)*60}

      ));
    }
  }

  increBreak(){
    if (this.state.isRunning!==true && this.state.break < 60){
      this.setState((state)=>({break: state.break + 1, 
        total: (state.session+state.break+1)*60 
      }
      ));
    }
  }

  decreSession(){
    if (this.state.isRunning!==true && this.state.session > 1){
      this.setState((state)=>({session: state.session-1, 

        timeDisp: (state.session-1)<10 ? `0${state.session-1}:00`: `${state.session-1}:00`, 
        total: (state.session+state.break-1)*60 }

      ));
    }
  }

  increSession(){
    if (this.state.isRunning!==true && this.state.session < 60){
      this.setState((state)=>({session: state.session+1, 

        timeDisp: (state.session+1)<10 ? `0${state.session+1}:00`: `${state.session+1}:00`, 
        total: (state.session+state.break+1)*60}

      ));
    }
  }

  handleChange(){
    let timeLeft  =  parseInt(this.state.timeDisp.split(":")[0])*60 + parseInt(this.state.timeDisp.split(":")[1])-1;
    let breakTime = (this.state.break)*60;
    let sessionTime = this.state.session*60 
    let totalTime = timeLeft + breakTime; 
    let isTimeRunning = !(this.state.isRunning); 
    if (isTimeRunning === false){
      clearInterval(this.timer); 
      this.setState({isRunning: isTimeRunning}) 
    }

    else{

      this.timer = setInterval(()=>{
        if (this.state.timeDisp==="00:00"){
          if (this.state.timeDisp==="00:00" && this.state.typeSess==="Session"){
            timeLeft = breakTime
            this.setState({typeSess:"Break"});
            document.getElementsByClassName("beep")[0].play();
          }
          else if (this.state.timeDisp==="00:00" && this.state.typeSess==="Break"){
            this.setState({typeSess:"Session", 
              timeDisp: (this.state.session)<10 ? `0${this.state.session}:00`: `${this.state.session}:00`
            });
            timeLeft = sessionTime ;
            document.getElementsByClassName("beep")[0].play();
          }
          
        }
        let minutes    = Math.floor(timeLeft/60); 
        let seconds    = timeLeft % 60; 
        let newTimeDisp = "";  
        minutes<10 ? newTimeDisp += `0${minutes}:`: newTimeDisp += `${minutes}:`
        seconds< 10 ? newTimeDisp += `0${seconds}`: newTimeDisp += `${seconds}`
        this.setState((state)=>({timeDisp: newTimeDisp, isRunning: true})); 
        timeLeft -=  1; 
        totalTime -= 1;
      }, 1000)
    }
  }


  reset(){
    clearInterval(this.timer);
    this.setState({
      break:5, 
      session:25, 
      isRunning: false, 
      timeDisp: "25:00", 
      total: 30*60,
      typeSess: "Session"
    })
    document.getElementsByClassName("beep")[0].load();
  }

  render(){
    return (
      <div className="App">
        <h1>25 + 5 Clock</h1>
        <div className="break-container">
          <p id="break-label">Break</p> 
          <p id="break-length">{this.state.break}</p>
          <button id="break-decrement" onClick={this.decreBreak.bind(this)}>Down</button>
          <button id="break-increment" onClick={this.increBreak.bind(this)}>Up</button>
        </div>
        <div className="session-container">
          <p id="session-label">Session</p>
          <p id="session-length">{this.state.session}</p>
          <button id="session-decrement" onClick={this.decreSession.bind(this)}>Down</button>
          <button id="session-increment" onClick={this.increSession.bind(this)}>Up</button>
        </div>
        <div id="timer-container">
          <div id="timer-label">{this.state.typeSess}</div>
          <button id="start_stop" onClick={this.handleChange.bind(this)}>Start/Stop</button>
          <p id="time-left">{this.state.timeDisp}</p>
          <audio className="beep" id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          <button id="reset" onClick={this.reset.bind(this)}>Reset</button>
       </div>
    </div>
    );
  }
}



export default App;
