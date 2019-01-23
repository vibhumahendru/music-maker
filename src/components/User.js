import React, { Component } from 'react';

class User extends Component {

  render() {
    return (
      <div>
      {this.props.user.name}
      <img onClick={()=>this.props.handleUserSelect(this.props.user)} className="user-image" src={this.props.user.img_url} alt="golf"/>
      </div>
    );
  }

}

export default User;
