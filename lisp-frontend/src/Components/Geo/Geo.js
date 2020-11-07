import React from "react";
import { geolocated } from "react-geolocated";

import './Geo.css';

class Geo extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div className="geoContainer"><p>???, ???</p></div>
        ) : !this.props.isGeolocationEnabled ? (
            <div className="geoContainer"><p>???, ???</p></div>
        ) : this.props.coords ? (
            <div className="geoContainer">
                <p>{this.props.coords.latitude} , {this.props.coords.longitude}</p>
            </div>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geo);