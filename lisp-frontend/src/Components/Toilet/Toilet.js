import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Toilet extends React.Component {
    render(){
        return(
            <div style={{marginTop:"10vh"}}>
                <Card style={{margin:"5vh"}}>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Body>
                        <div style={{marginLeft:"1vh", marginRight:"1vh"}}>
                            <Row>
                                <Col xs={12} md={8} style={{textAlign:"left"}}>
                                    <h2><a href={"https://www.google.com/maps/search/?api=1&query=" + (this.props.address).replace(" ", "+")}>{this.props.address}</a></h2>
                                    <h4>Distance from you: {this.props.distance} </h4>
                                    <h4>Washroom type: {this.props.type}</h4>
                                    <h4>Average Smell: {this.props.smell}</h4>
                                    <h4>Average Cleanliness: {this.props.clean}</h4>
                                    <h4>Average Rating: {this.props.avgrating} ({this.props.totalratings} ratings)</h4>
                                    <Button variant="primary"> Rate this washroom</Button>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Image src="https://external-preview.redd.it/JW7uwSyxzFayCqF9rjHFpqLM7y4zoZIr7-ZqP-a7Kkc.jpg?auto=webp&s=fa3020496636aa3b3f89a9ae632a829de67c9c80" fluid />
                                    
                                </Col>
                            </Row>
                        </div>
                        
                        
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Toilet;