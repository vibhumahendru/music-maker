import React, { Component } from 'react';
import Sound from './Sound.js'
import '../App.css';

class SoundContainer extends Component {

  render() {
    return (
      <div>
      {this.props.sounds.map(sound=> <Sound playAnyFrequency={this.props.playAnyFrequency} sound={sound}/>)}
      </div>
    );
  }

}

export default SoundContainer;
