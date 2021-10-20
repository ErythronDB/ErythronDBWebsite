import React from 'react';
import { Link } from 'wdk-client/Components';
import NewWindowLink from 'ebrc-client/components/NewWindowLink';
import { webAppUrl } from 'ebrc-client/config';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { _WDK_GITHUB_URL } from '../../data/constants';

export default function Footer() {

    return (

        <footer className="Footer">
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div>ErythronDB ©{new Date().getFullYear()} University of Pennsylvania Perelman School of Medicine</div>
                        <div>
                            Please <NewWindowLink href={webAppUrl + '/app/contact-us'}>Contact Us</NewWindowLink> with any questions or comments
                    </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

