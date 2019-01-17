import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state={
    noteAr:[]
  }

  constructor(){
    super()
    this.counterC = 0;
    this.counterE = 0;
    this.counterG = 0;

    this.audioContext = new AudioContext();

    this.cMajor = this.audioContext.createOscillator()
    this.cMajor.frequency.value = 	523.251

    this.eMajor = this.audioContext.createOscillator()
    this.eMajor.frequency.value = 	659.255

    this.gMajor = this.audioContext.createOscillator()
    this.gMajor.frequency.value = 	783.991

    this.anyNote = this.audioContext.createOscillator()

  }




  handleCMajor = ()=>{
    // if (this.counterC === 0) {
    //   this.cMajor.connect(this.audioContext.destination)
    //   this.counterC=1;
    // }else{
    //   this.cMajor.disconnect()
    //   this.counterC = 0
    // }
      this.cMajor.connect(this.audioContext.destination)
      setTimeout(()=>this.cMajor.disconnect(), 500)

  }

  handleEMajor = ()=>{
    // if (this.counterE === 0) {
    //   this.eMajor.connect(this.audioContext.destination)
    //   this.counterE=1;
    // }else{
    //   this.eMajor.disconnect()
    //   this.counterE = 0
    // }
    this.eMajor.connect(this.audioContext.destination)
    setTimeout(()=>this.eMajor.disconnect(), 500)
  }

  handleGMajor = ()=>{
    // if (this.counterG === 0) {
    //   this.gMajor.connect(this.audioContext.destination)
    //   this.counterG=1;
    // }else{
    //   this.gMajor.disconnect()
    //   this.counterG = 0
    // }
    this.gMajor.connect(this.audioContext.destination)
    setTimeout(()=>this.gMajor.disconnect(), 500)
  }

  playAll = ()=>{
    this.handleCMajor()
    setTimeout(this.handleEMajor,500)
    setTimeout(this.handleGMajor,1000)
    setTimeout(this.handleEMajor,1500)
    setTimeout(this.handleCMajor,2000)
    setTimeout(this.handleGMajor,2500)


  }

   stop=()=>{
     this.cMajor.disconnect()
   }

   playAnyFrequency =(freq)=>{
     this.anyNote.frequency.value = freq
     this.anyNote.connect(this.audioContext.destination)
     setTimeout(()=>this.anyNote.disconnect(), 500)

   }



  start=()=>{
    this.cMajor.start()
    this.eMajor.start()
    this.gMajor.start()
    this.anyNote.start()
  }




  render() {



    return (
      <div className="App">
        <button onClick={()=>this.playAnyFrequency(523.251)}>C Major</button>
        <button onClick={()=>this.playAnyFrequency(659.255)}>E Major</button>
        <button onClick={()=>this.playAnyFrequency(783.991)}>G Major</button>
        <button onClick={this.playAll}>Play All</button>

        <button onClick={this.start}>Start</button>
      </div>
    );
  }
}

export default App;
