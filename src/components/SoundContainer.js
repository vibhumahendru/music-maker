import React, { Component } from 'react';
import Sound from './Sound.js'
import '../App.css';

class SoundContainer extends Component {

  render() {
    return (
      <div>
      {this.props.sharpSounds.map(sound=> <Sound playAnyFrequency={this.props.playAnyFrequency} sound={sound}/>)}
      <br></br>
      {this.props.sounds.map(sound=> <Sound playAnyFrequency={this.props.playAnyFrequency} sound={sound}/>)}
      </div>
    );
  }

}

export default SoundContainer;
