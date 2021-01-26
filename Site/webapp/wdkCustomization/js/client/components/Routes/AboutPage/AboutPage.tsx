import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { CompositeService as WdkService } from "wdk-client/Service/ServiceMixins";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <Row>
            <Col>
                <h1>ErythronDB Datasets</h1>
                <h3>Transcriptomics</h3>
                {_resources.map((res) => _buildResource(res, "Transcriptomics"))}

                <h3 className="mt-4">Proteomics</h3>
                {_resources.map((res) => _buildResource(res, "Proteomics"))}

                <h1>External Resources</h1>
                <h3>Gene Annotation</h3>
                {_resources.map((res) => _buildResource(res, "Gene Annotation"))}

                <h3>Functional Annotation</h3>
                {_resources.map((res) => _buildResource(res, "Functional Annotation"))}

                <h3>Array Annotation</h3>
                {_resources.map((res) => _buildResource(res, "Array Annotation"))}

                <h3>Ontologies</h3>
                {_resources.map((res) => _buildResource(res, "Ontologies"))}

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
