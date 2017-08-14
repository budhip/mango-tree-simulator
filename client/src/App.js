import React, { Component } from 'react';
import benih from './0.png';
import tunas from './1.png';
import muda from './2.png';
import siappanen from './3.png';
import mati from './4.png';
import './App.css';
import * as firebase from 'firebase';
import renderIf from 'render-if'

class App extends Component {

  constructor() {
    super();
    this.state = {
      buahSekarang: 0,
      tinggiSekarang: 0,
      umurSekarang: 0
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('mango-tree');
    const buahSekarangRef = rootRef.child('buahSekarang');
    const tinggiSekarangRef = rootRef.child('tinggiSekarang');
    const umurSekarangRef = rootRef.child('umurSekarang');
    buahSekarangRef.on('value', snap => {
      this.setState({
        buahSekarang: snap.val()
      });
    });
    tinggiSekarangRef.on('value', snap => {
      this.setState({
        tinggiSekarang: snap.val()
      });
    });
    umurSekarangRef.on('value', snap => {
      this.setState({
        umurSekarang: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Mango Tree</h1>
        {renderIf(this.state.umurSekarang < 3)(
          <div className="justify-content-center row">
            <img className="" src={benih} alt="mangoo-tree" width="300"></img>
          </div>
        )}

        {renderIf(this.state.umurSekarang > 2 && this.state.umurSekarang < 5)(
          <div className="justify-content-center row">
            <img className="" src={tunas} alt="mangoo-tree" width="300"></img>
          </div>
        )}

        {renderIf(this.state.umurSekarang > 4 && this.state.umurSekarang < 8)(
          <div className="justify-content-center row">
            <img className="" src={muda} alt="mangoo-tree" width="300"></img>
          </div>
        )}

        {renderIf(this.state.umurSekarang > 7 && this.state.umurSekarang < 26)(
          <div className="justify-content-center row">
            <img className="" src={siappanen} alt="mangoo-tree" width="300"></img>
          </div>
        )}

        {renderIf(this.state.umurSekarang > 25)(
          <div className="justify-content-center row">
            <img className="" src={mati} alt="mangoo-tree" width="300"></img>
          </div>
        )}

        <p> Umur: {this.state.umurSekarang} tahun </p>
        <p> Tinggi: {this.state.tinggiSekarang} meter </p>
        <p> Buah: {this.state.buahSekarang} buah </p>

      </div>
    );
  }
}

export default App;
