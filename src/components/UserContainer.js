import React, { Component } from 'react';
import User from './User.js'

class UserContainer extends Component {

  render() {
    return (
      <div className="user-container">
      <h2>Users</h2>
      {this.props.currentUser.id ? <h3>Current User: {this.props.currentUser.name}</h3>:null}
      {this.props.currentUser.id ? this.props.currentUser.formattedTracks.map((track, index)=> <li onClick={()=>this.props.handleTrackSelect(track)} >Track {index+1}</li>) :null}

      <ol>
      {this.props.users.map(user=> <li><User handleUserSelect={this.props.handleUserSelect} user={user}/></li>)}
      </ol>
      </div>
    )
  }

}

export default UserContainer;
