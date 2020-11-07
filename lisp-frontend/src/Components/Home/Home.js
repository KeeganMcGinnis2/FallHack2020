import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Home extends React.Component {
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <h1>Latrine Inspection Sanitary Protection</h1>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group controlId="formSearch">
                                <Form.Control placeholder="Enter your location." />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;