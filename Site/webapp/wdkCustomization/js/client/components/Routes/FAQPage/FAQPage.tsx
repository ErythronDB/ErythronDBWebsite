import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { CompositeService as WdkService } from "wdk-client/Service/ServiceMixins";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { _faq } from '../../../data/faq';

interface FAQItem {
    question: string,
    description: string,
    category: string
}

const FAQ: React.FC<{}> = () => {
    return (
        <Row>
           

            <Col>
               <h1>Coming soon...</h1>
            </Col>
        </Row>

    );
}

const FAQPage: React.FC<RouteComponentProps<any>> = () => {


    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <h1>FAQ</h1>
                    <p>Description coming soon</p>
                </Col>
            </Row>
            
          
        </Container>
    );
};

const _buildResource = (result: FAQItem, category: string) => {
    return (
      <div></div>
    );
};

export default withRouter(FAQPage);
