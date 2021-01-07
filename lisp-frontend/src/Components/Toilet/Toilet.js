import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ReactModal from 'react-modal'
import './Toilet.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Slider from 'react-input-slider'

import { ReactComponent as Nose } from './nose.svg';
import { ReactComponent as Star } from './star.svg';
import { ReactComponent as Clean } from './washing-hands.svg';

const googkey = require("../../secret.js").api_key

const modalstyle = {
    content: {
        width: "600px",
        height: "220px",
        position: "absolute",
        left: '50%',
        top: '50%',
        marginLeft: "-150px",
        marginTop: "-150px",
        }
  };

class Toilet extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            smell: 0,
            clean: 0,
            rating: 0,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.submitRating = this.submitRating.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            smell: 0,
            clean: 0,
            rating: 0
        });
    }

    submitRating() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "primaryind": this.props.primaryind,
            "smell": this.state.smell,
            "cleanliness": this.state.clean,
            "overall": this.state.rating
        });

        let requestOptions = {
            method: "POST",
            headers: headers,
            body: raw
        }

        fetch("http://localhost:8000/api/LISP", requestOptions)
            .then(response => response.text())
            .then(result => console.log("RESPONSE:", result))
            .catch(error => console.log("ERROR:", error));

        this.setState({
            showModal: false,
            smell: 0,
            clean: 0,
            rating: 0
        });
    }

    render(){
        return(
            <div>
                <Card style={{marginLeft:"5vh", marginRight:"5vh", marginBottom:"2vh"}}>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Body>
                        <div style={{marginLeft:"1vh", marginRight:"1vh"}}>
                            <Row>
                                <Col xs={12} md={8} style={{textAlign:"left"}}>
                                    <h2 style={{marginBottom:"5vh"}}><a href={"https://www.google.com/maps/search/?api=1&query=" + (this.props.address).replace(" ", "+")}>{this.props.address}</a></h2>
                                    <Row>
                                        <Col>
                                            <h4>Distance from you: </h4>
                                            <h4>Washroom type: </h4>
                                            <h4><Nose className="logo"/>Average Smell: </h4>
                                            <h4><Clean className="logo"/>Average Cleanliness: </h4>
                                            <h4><Star className="logo"/>Average Rating:</h4>
                                        </Col>
                                        <Col>
                                            <h4 className="desc">{this.props.distance} km</h4>
                                            <h4 className="desc">{this.props.type}</h4>
                                            <h4 className="desc">{this.props.smell}</h4>
                                            <h4 className="desc">{this.props.clean}</h4>
                                            <h4 className="desc">{this.props.avgrating} ({this.props.totalratings} ratings)</h4>
                                        </Col>
                                    </Row>
                                    <Button onClick={this.handleOpenModal} variant="primary" style={{marginTop:"10vh"}}>Rate this Washroom</Button>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Image src={"https://maps.googleapis.com/maps/api/streetview?size=200x200&location="+this.props.lat+","+this.props.lon+"&fov=80&heading=70&pitch=0&key="+googkey} rounded style={{width:"90%"}} fluid />
                                </Col>
                            </Row>
                        </div>  
                    </Card.Body>
                </Card>
                <ReactModal isOpen={this.state.showModal} style={modalstyle}>
                    <h2>Rate this latrine</h2>
                    <Row>
                        <Col>
                            <p> Smell:<br/>
                            Cleanliness: <br/>
                            Overall score:</p>
                        </Col>
                        <Col>
                            <Slider
                            axis="x"
                            xstep={1}
                            xmin={0}
                            xmax={5}
                            x={this.state.smell}
                            onChange={({ x }) => this.setState({ smell: parseFloat(x.toFixed(2)) })}
                        />   { this.state.smell }
                        <br/>
                        <Slider
                            axis="x"
                            xstep={1}
                            xmin={0}
                            xmax={5}
                            x={this.state.clean}
                            onChange={({ x }) => this.setState({ clean: parseFloat(x.toFixed(2)) })}
                        />   { this.state.clean }
                        <br/>
                        <Slider
                            axis="x"
                            xstep={1}
                            xmin={0}
                            xmax={5}
                            x={this.state.rating}
                            onChange={({ x }) => this.setState({ rating: parseFloat(x.toFixed(2)) })}
                        />   { this.state.rating }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}><Button onClick={this.submitRating} variant="primary">Submit Rating</Button></Col>
                        <Col md={2}><Button variant="danger" onClick={this.handleCloseModal}>Cancel</Button></Col>
                    </Row>
                </ReactModal>
            </div>
        );
    }
}

export default Toilet;