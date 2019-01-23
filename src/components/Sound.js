import React, { Component } from 'react';

class Sound extends Component {

  render() {
    return (
      <button onClick={()=>this.props.playAnyFrequency(this.props.sound)}>{this.props.sound.note}</button>
    );
  }

}

export default Sound;
