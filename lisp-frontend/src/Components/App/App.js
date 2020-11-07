import './App.css';
import Home from '../Home/Home'
import Geo from '../Geo/Geo'
import Navigation from '../Navigation/Navigation'
import Toilet from '../Toilet/Toilet'
function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Navigation/>
      {/* <Geo/> */}
      <Toilet address="861 Cliff Ave" rating="6.9" type="poopy"/>
    </div>
  );
}

export default App;
