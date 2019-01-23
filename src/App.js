import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SoundContainer from './components/SoundContainer.js'
import Track from './components/Track.js'
import UserContainer from './components/UserContainer.js'
import soundFile from './gotemcoach.mp3'



class App extends Component {

  soundsData=[
      {id:1, freq: 440, note: "A"},
      {id:2, freq: 493.883, note: "B"},
      {id:3, freq: 523.251, note: "C"},
      {id:4, freq: 587.33, note: "D"},
      {id:5, freq: 659.255, note: "E"},
      {id:6, freq: 698.456, note: "F"},
      {id:7, freq: 783.991, note: "G"},
      {id:8, freq: 880, note: "a"},
      {id:9, freq: 987.767, note: "b"},
      {id:10, freq: 1046.502, note: "c"},
      {id:11, freq: 0, note: "Blank"}
  ]

  usersData=[
    {id:1, name: "Vibhu", img_url:"https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"},
    {id:2, name: "Bhai", img_url:"https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"},
    {id:3, name: "Bro", img_url:"https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"},
    {id:4, name: "Lol", img_url:"https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"},
    {id:5, name: "Bhaaaai", img_url:"https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"}
  ]

  state={
    track:[],
    sounds:[],
    users: [],
    currentUser:{},
    tempo: 100,
    currentTrack:0,
    waveType: "sine"
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/sounds')
    .then(res => res.json())
    .then(soundsData => {
      this.setState({
        sounds: soundsData
      })
    })

    fetch('http://localhost:3000/api/v1/users')
    .then(res=> res.json())
    .then(userData => {
      this.setState({
        users: userData
      })
    })
  }

  constructor(){
    super()
    this.audioContext = new AudioContext();
    this.anyNote = this.audioContext.createOscillator()
    this.gotemcoach = new Audio(soundFile)
  }

  handleTrackPlay = (freq)=>{
    let osc = this.audioContext.createOscillator()
    osc.frequency.value = freq
    osc.type = this.state.waveType
    osc.connect(this.audioContext.destination)
    osc.start()
    setTimeout(()=>osc.disconnect(), this.state.tempo)
  }

  stop=()=>{
     this.cMajor.disconnect()
   }

  playAnyFrequency =(soundObj)=>{

      this.setState({
        track:[...this.state.track, soundObj]
      })

     this.anyNote.frequency.value = soundObj.freq
     this.anyNote.connect(this.audioContext.destination)
     setTimeout(()=>this.anyNote.disconnect(), 500)

   }

  start=()=>{
    this.anyNote.start()
  }

  playArray = (array)=>{
    // this.gotemcoach.play()
    array.forEach((soundObj,index) => {
      setTimeout(() => this.handleTrackPlay(soundObj.freq), this.state.tempo*index)
    })


  }

  resetTrack=()=>{
    this.setState({
      track:[]
    })
  }

  deleteFromTrack=(soundObj)=>{
    let copyTrack = [...this.state.track]
    let index = this.state.track.findIndex(s=> s.id ===soundObj.id)
    copyTrack.splice(index,1)
    this.setState({
      track: copyTrack
    })
  }

  handleUserSelect=(userObj)=>{
    this.setState({
      currentUser:userObj,
      currentTrack: null
    })
  }

  handleTempo=(event)=>{
     this.setState({
       tempo:event.target.value
     })
  }

  handleTrackSelect =(track)=>{

    this.setState({
      track: track.sounds,
      currentTrack: track.id
    })

  }

  handleSave=()=>{
    let soundIdAr = this.state.track.map(sound=> sound.id)
    let soundIdArray=[]
    console.log(soundIdAr)
    fetch('http://localhost:3000/api/v1/tracks',{
      method: 'POST',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'},
      body: JSON.stringify({
          user_id: this.state.currentUser.id,
          sound_ids: soundIdAr
      })}
    ).then(res => res.json())
    .then(track => {
      this.setState({

      })
    })

    let copyCurrentUser = Object.assign({}, this.state.currentUser)
    // console.log(copyCurrentUser);
    let newObj = {sounds: this.state.track}
    copyCurrentUser.tracks = [...copyCurrentUser.tracks, newObj]
    // console.log(copyCurrentUser)
    this.setState({
      currentUser:copyCurrentUser
    })
  }

  handleDeleteTrack =()=>{
    console.log(this.state.currentTrack);

    let filteredCurrentUserTrackAr = this.state.currentUser.tracks.filter(track=> track.id !== this.state.currentTrack)
    console.log(filteredCurrentUserTrackAr)
    fetch(`http://localhost:3000/api/v1/tracks/${this.state.currentTrack}`,{
      method: 'DELETE',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}
      }
    )

    fetch('http://localhost:3000/api/v1/users')
    .then(res=> res.json())
    .then(userData => {
      this.setState({
        users: userData
      })
    })




    let copyCurrentUser = Object.assign({}, this.state.currentUser)
    copyCurrentUser.tracks = filteredCurrentUserTrackAr
    this.setState({
      currentUser: copyCurrentUser,
      track:[],
      currentTrack: 0
    })

  }

  loop=(array)=>{
    // array.forEach((soundObj,index) => {
    //   setTimeout(() => this.handleTrackPlay(soundObj.freq), this.state.tempo*index)
    // })
    // this.playArray(array)
    // setTimeout(()=>this.playArray(array), this.state.track.length*this.state.tempo )
    // setTimeout(()=>this.playArray(array), 2*(this.state.track.length*this.state.tempo) )
    let i = 1
    while (i < 10) {
      setTimeout(()=>this.playArray(array), i*(this.state.track.length*this.state.tempo) )
      i++;
      }
  }



  gotem=()=>{
    console.log("sup");
    this.gotemcoach.play()
  }

  handleWaveSelect =(event)=>{
    console.log(event.target.value)
    this.setState({
      waveType:event.target.value
    })
  }



  render() {

    return (
      <div className="App">
        <div className="one">
          <div className="nav">
          <h2>Nav</h2>
          <button onClick={()=>this.loop(this.state.track)} >Loop</button>
          <button onClick={()=>this.playArray(this.state.track)}>Play Track</button>
          <button onClick={this.start}>Start</button><br></br>
          <br></br>
            <form>Wave Type:
              <select onChange={(event)=>this.handleWaveSelect(event)} id="mySelect">
                <option>sine</option>
                <option>triangle</option>
                <option>square</option>
                <option>sawtooth</option>
              </select>
            </form>
          Tempo: <input onChange={this.handleTempo} type="range" min="100" max="1000" value={this.state.tempo} />
          </div>
          <div className="sound-container">
          <h2>Sounds</h2>
          <SoundContainer playAnyFrequency={this.playAnyFrequency} sounds={this.state.sounds}/>
          </div>
          <div className="track">
          <h2>Track</h2>
          <Track resetTrack={this.resetTrack} currentTrack={this.state.currentTrack} handleDeleteTrack={this.handleDeleteTrack} handleSave={this.handleSave} deleteFromTrack={this.deleteFromTrack} track={this.state.track}/>
          </div>
        </div>
        <div className="two">
          <UserContainer handleTrackSelect={this.handleTrackSelect} currentUser={this.state.currentUser} handleUserSelect={this.handleUserSelect} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
