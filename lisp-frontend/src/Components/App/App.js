import React from 'react'
import './App.css';
import Home from '../Home/Home'
import Geo from '../Geo/Geo'
import Navigation from '../Navigation/Navigation'
import Toilet from '../Toilet/Toilet'
import MyComponent from './Test.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/LISP?latitude=-123.103599022256&longitude=49.2778209665246")
      .then(res => res.text())
      .then(
          result => {
              console.log("RESULT: " + result);
              console.log(JSON.parse(result))
              this.setState({
                  isLoaded: true,
                  items: JSON.parse(result)
              });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              this.setState({
                  isLoaded: true,
                  error
              });
          }
      );
  }

  render() {
    return (
      <div className="App">
        {/* <Home/> */}
        <Navigation/>
        {/* <Geo/> */}
        <div style={{marginTop:"12vh"}}>
          {this.state.items.map(item => <Toilet key={item.primaryind} address={item.address} distance={item.distance} type="Restroom" smell={item.smell} 
            clean={item.cleanliness} avgrating={item.overall} totalratings={item.num_of_ratings} lat={item.lat} lon={item.lon} primaryind={item.primaryind}/>)}
        </div>
        {/* <MyComponent/> */}
      </div>
    );
  }
}

export default App;