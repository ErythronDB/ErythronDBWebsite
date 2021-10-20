import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { makeClassNameHelper } from "wdk-client/Utils/ComponentUtils";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card, { CardText } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { _faq } from "../../../data/faq";

import "./../FAQPage/FAQPage.scss";

const cx = makeClassNameHelper("edb-faq");

interface FAQ {
  question: string;
  anchor: string;
  content: string;
}

const FAQPageNav: React.FC<{}> = () => {
  return (
    <Nav
      defaultActiveKey="about"
      className={`mt-5 mb-5 flex-column ${cx("side-nav")}`}
    >

    {_faq.map((f) => _buildNav(f))}
     
    </Nav>
  );
};

const FAQPage: React.FC<RouteComponentProps<any>> = () => {
  return (
    <Container fluid={true} className="mb-5 no-gutters px-0">
      <Row>
        <FAQPageNav />
      </Row>
      <Row>
          <Col>
          {_faq.map((f) => _buildFAQ(f))};
          </Col>
      </Row>
    </Container>
  );
};

const _buildNav = ( faq: FAQ) => {
    return (
        <Nav.Link key={faq.anchor} className={cx("--nav")} href={`#${faq.anchor}`} eventKey={faq.anchor}>{faq.question}</Nav.Link>
    )
}

const _buildFAQ = (faq: FAQ) => {
  return (
      <div key={faq.anchor}>
      <a id={faq.anchor} className={cx("--question")}>{faq.question}</a>
      <p className={cx("--text")}>{faq.content}</p>
      </div>
    );
};

export default withRouter(FAQPage);
