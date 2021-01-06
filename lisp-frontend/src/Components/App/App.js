import React from 'react'
import './App.css';
import Home from '../Home/Home'
import Geo from '../Geo/Geo'
import Navigation from '../Navigation/Navigation'
import Toilet from '../Toilet/Toilet'
import MyComponent from './Test.js'

// function App() {
//   return (
//     <div className="App">
//       {/* <Home/> */}
//       <Navigation/>
//       {/* <Geo/> */}
//       <div style={{marginTop:"12vh"}}>
//         <Toilet address="89 Expo Boulevard" type="Restroom" smell="2.5" clean="3.3" avgrating="2.7" totalratings="30" distance="0.5" lat="49.2778209665246" lon="-123.103599022256"/>
//         <Toilet address="2510 Hoylake Avenue" type="Restroom" smell="3.7" clean="4.3" avgrating="4.0" totalratings="41" distance="0.7" lat="49.2156069867489" lon="-123.056414955041"/>
//         <Toilet address="4175 Wallace Street" type="Restroom" smell="3.0" clean="3.0" avgrating="3.0" totalratings="2" distance="0.8" lat="49.2494269600837" lon="-123.19112496205"/>
//         <Toilet address="5275 McKinnon Street" type="Restroom" smell="5.0" clean="5.0" avgrating="5.0" totalratings="3" distance="1.2" lat="49.2365299637476" lon="-123.036715960679"/>
//         <Toilet address="1700 Beach Avenue" type="Restroom" smell="4.0" clean="4.0" avgrating="4.0" totalratings="1" distance="1.3" lat="49.2861540400257" lon="-123.142804967084"/>
//       </div>
//       {/* <MyComponent/> */}
//     </div>
//   );
// }
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
          {this.state.items.map(item => <Toilet key={item.primaryind} address="89 Expo Boulevard" type="Restroom" smell={item.smell} 
            clean={item.cleanliness} avgrating={item.overall} totalratings={item.num_of_ratings} lat={item.lat} lon={item.lon}/>)}
        </div>
        {/* <MyComponent/> */}
      </div>
    );
  }
}

export default App;
