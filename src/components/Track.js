import React, { Component } from 'react';

class Track extends Component {

  render() {
    return (
      <div>
      <p>{this.props.track.map(soundObj=> <button onClick={()=>this.props.deleteFromTrack(soundObj)}>{soundObj.note}</button>)}</p>
      <button onClick={this.props.handleSave}>Save</button>
      {this.props.currentTrack>0 ? <button onClick={()=>this.props.handleDeleteTrack()}>Delete</button> :null}
      {this.props.track.length>0 ? <button onClick={this.props.resetTrack}>Reset Track</button> :null}
      </div>
    );
  }

}

export default Track;
