import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { CompositeService as WdkService } from "wdk-client/Service/ServiceMixins";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { _resources } from '../../../data/resources';

interface Resource {
    name: string,
    link: string,
    route: string,
    description: string,
    category: string
}

const Resources: React.FC<{}> = () => {
    return (
        <Row className="mt-5">
            <Col xs={5}>
            <h1>Data Sources</h1>
                <Accordion >
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                ErythronDB Datasets: Transcriptomics
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {_resources.map((res) => _buildResource(res, "Transcriptomics"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                  
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                ErythronDB Datasets: Proteomics
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body> 
                                {_resources.map((res) => _buildResource(res, "Proteomics"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Gene Annotation
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body> 
                                {_resources.map((res) => _buildResource(res, "Gene Annotation"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="3">
                                Functional Annotation
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body> 
                                {_resources.map((res) => _buildResource(res, "Functional Annotation"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="4">
                                Array Annotation
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body> 
                                {_resources.map((res) => _buildResource(res, "Array Annotation"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="5">
                                Ontologies
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body> 
                                {_resources.map((res) => _buildResource(res, "Ontology"))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </Col>
        </Row>

    );
}

const AboutPage: React.FC<RouteComponentProps<any>> = () => {



    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <h1>About this Project</h1>
                    <p>Description coming soon</p>
                </Col>
            </Row>


            <Resources />
        </Container>
    );
};

const _buildResource = (result: Resource, category: string) => {
    return (
        result.category === category && (
            <div key={result.name}>
                {result.route != null
                    ? <h5 className="mt-3">{result.name} <RouterLink to={result.route}><i className="fa fa-external-link"></i></RouterLink></h5>
                    : <h5 className="mt-3">{result.name} <a href={result.link}><i className="fa fa-external-link"></i></a></h5>
                }

                {result.description &&
                    <div>{result.description}</div>
                }
            </div>
        )
    );
};

export default withRouter(AboutPage);
