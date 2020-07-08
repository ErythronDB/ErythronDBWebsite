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
                <Row>
                    <Col xs={12}>
                        <div>ErythronDB ©{new Date().getFullYear()} University of Pennsylvania Perelman School of Medicine</div>
                        <div>
                            Please <NewWindowLink href={webAppUrl + '/app/contact-us'}>Contact Us</NewWindowLink> with any questions or comments
                    </div>
                    </Col>

                    <Col xs={3}>
                        <div>
                            <a href={_WDK_GITHUB_URL}>
                                <img width="120" src={webAppUrl + '/wdk/images/stratWDKlogo.png'} />
                            </a>
                        </div>

                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

