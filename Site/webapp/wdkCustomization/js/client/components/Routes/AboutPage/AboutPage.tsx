import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link as RouterLink } from "wdk-client/Components";
import { makeClassNameHelper } from "wdk-client/Utils/ComponentUtils";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { _resources } from "../../../data/resources";
import { useWdkEffect } from "wdk-client/Service/WdkService";

import "./AboutPage.scss";

const cx = makeClassNameHelper("edb-about");

const TOCBOT_OPTIONS = {
  tocSelector: ".js-toc",
  contentSelector: ".js-toc-content",
  headingSelector: "h2, h3, h4",
  positionFixedSelector: ".js-toc",
  includeHtml: true,
  hasInnerContainers: true,
  headingsOffset: 40,
  scrollSmoothOffset: -40,
};

interface Resource {
  name: string;
  link: string;
  route: string;
  description: string;
  category: string;
}

interface Method {
  name: string;
  description: string;
}

const AboutPageNav: React.FC<{}> = () => {
  return (
    <Nav
      defaultActiveKey="about"
      className={`mt-5 flex-column ${cx("side-nav")}`}
    >
      <Nav.Link href="#about" eventKey="about">
        About ErythronDB
      </Nav.Link>
      <Nav.Link href="#datasets" eventKey="datasets">
        Datasets and External Resources
      </Nav.Link>
      <Nav.Link href="#methods" eventKey="methods">
        Methods
      </Nav.Link>
    </Nav>
  );
};

const MethodsSection: React.FC<{}> = () => {
  return (
    <Row className="mt-5">
      <Col>
        <a id="datasets"></a>
        <h2 className="mt-5">Data Sources</h2>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Methods
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

const ResourcesSection: React.FC<{}> = () => {
  return (
    <Row className="mt-5">
      <Col>
        <a id="datasets"></a>
        <h2 className="mt-5">Data Sources</h2>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              ErythronDB Datasets: Transcriptomics
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {_resources.map((res) =>
                  _buildResource(res, "Transcriptomics")
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              ErythronDB Datasets: Proteomics
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {_resources.map((res) => _buildResource(res, "Proteomics"))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Gene Annotation
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {_resources.map((res) =>
                  _buildResource(res, "Gene Annotation")
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              Functional Annotation
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                {_resources.map((res) =>
                  _buildResource(res, "Functional Annotation")
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              Array Annotation
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                {_resources.map((res) =>
                  _buildResource(res, "Array Annotation")
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="5">
              Ontologies
            </Accordion.Toggle>
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
};

const AboutSection: React.FC<{}> = () => {
  return (
    <Row>
      <Col md={10}>
        <a id="about"></a>
        <h2 className="mt-5">About the ErythronDB Project</h2>
        <p className={cx("p")}>
          The Erythron Database (ErythronDB) is a resource dedicated to
          facilitating better understanding of the cellular and molecular
          underpinnings of mammalian erythropoiesis. It provides a searchable
          database of murine gene expression during murine primitive,
          definitive, and stress erythroid cells at progressive stages of
          maturation. ErythronDB also allows users to explore the role of
          erythropoietin (the principal hormone regulating erythropoiesis) and
          identify potential targets of EPO-signaling via comparison of
          rhEPO-treated versus control cells in mouse (microarray expression)
          and human (proteomics) datasets.
        </p>
        <p>
          ErythronDB was developed by a team of researchers at the University of
          Pennsylvania, in collaboration with [Palis Lab] / [Wojchowski Lab].{" "}
        </p>
        <h3 className={`${cx("p")} mt-4`}>To Cite this Resource</h3>
        <p>
          Kingsley P.D., Greenfest-Allen E., Frame J., Bushnell T., Malik J.,
          McGrath K.E., Stoeckert C.J., and Palis J. Ontogeny of erythroid gene
          expression. eBlood. 2012. PMID:{" "}
          <a href="http://www.ncbi.nlm.nih.gov/pubmed/23243273">23243273</a>
        </p>
        <h3 className={`${cx("p")} mt-4`}>Funding</h3>
        <p>
          National Institute of Diabetes and Digestive Kidney Diseases
          (Erythroid Lineage Molecular Toolbox); NIDDK R01 DK 071116
        </p>
      </Col>
    </Row>
  );
};

const AboutPage: React.FC<RouteComponentProps<any>> = () => {
  return (
    <Container fluid={true} className="mb-5 no-gutters px-0">
      <Row>
        <Col sm={3}>
          <AboutPageNav />
        </Col>
        <Col>
          <AboutSection />
          <ResourcesSection />
        </Col>
      </Row>
    </Container>
  );
};

const _buildResource = (result: Resource, category: string) => {
  return (
    result.category === category && (
      <div key={result.name}>
        {result.route != null ? (
          <h5 className="mt-3">
            {result.name}{" "}
            <RouterLink to={result.route}>
              <i className="fa fa-external-link"></i>
            </RouterLink>
          </h5>
        ) : (
          <h5 className="mt-3">
            {result.name}{" "}
            <a href={result.link}>
              <i className="fa fa-external-link"></i>
            </a>
          </h5>
        )}

        {result.description && <div>{result.description}</div>}
      </div>
    )
  );
};

export default withRouter(AboutPage);
