import React, { Component } from 'react';
import {Link} from "react-router-dom"
import '../App.css';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome" >
        <Link to="/music-maker">Start</Link>
      </div>
    );
  }

}

export default Welcome;
