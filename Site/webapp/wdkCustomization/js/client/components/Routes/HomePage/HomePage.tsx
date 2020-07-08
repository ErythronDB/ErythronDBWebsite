import React from 'react';
import { connect } from 'react-redux';
import { User } from 'wdk-client/Utils/WdkUser';
import { _studies } from '../../../data/studies';
import StudyCard from '../../Components/StudyCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';

interface HomePageProps {
    webAppUrl?: string;
}

interface StudyPanelProps extends HomePageProps {
    studies?: any;
    title?: string;
}

const GeneSearch: React.FC<HomePageProps> = props => {
    const { webAppUrl } = props;
    return (
        <form className="form" method="post" action={`${props.webAppUrl}/processQuestionSetsFlat.do?`}>
            <input type="hidden" name="questionSubmit" value="Get Answer" />
            <input type="hidden" name="questionFullName" value="GeneQuestions.GeneByIdentifier" />
            <div className="input-group">
                <div className="input-group-prepend welcome-search-prepend">
                    <span className="input-group-text welcome-search-icon px-3" id="basic-addon1"><i className="fa fa-search"></i></span>
                </div>
                <input className="form-control welcome-search-input p-4" type="text" placeholder="Search for a gene" name="value(generic_gene_identifier)" aria-label="GeneSearch" />
            </div>
        </form>

    )
}

const WelcomePanel: React.FC<HomePageProps> = props => {
    const { webAppUrl } = props;
    return (
        <Row noGutters={true} className="welcome-panel justify-content-md-center p-5" style={{ background: `url(${webAppUrl}/images/ErythronDB/erythrocytes_opaque.png)`, }} >
            <Col sm={5}>
                <h1 className="display-3title mb-5">Welcome to ErythronDB</h1>

                <h3 className="mb-4 subtitle">A platform for exploring the cellular and molecular underpinnings of mammalian erythropoiesis</h3>
            </Col>
            {/* <Col sm={2} className="my-auto">
                <ButtonGroup vertical>
                    <Button size="lg" variant="secondary" className="py-3" href="#studies">Browse Studies <i className="ml-3 fa fa-caret-right"></i></Button>
                    <Button size="lg" variant="secondary" className="py-3" href={`${webAppUrl}/showQuestion.do?questionFullName=GeneQuestions.GeneUpload`}>Upload a list of Genes <i className="fa fa-upload"></i></Button>
                </ButtonGroup>
              </Col> */}
        </Row>
    )
}

const StudyTitle: React.FC<StudyPanelProps> = props => {
    const { title } = props;
    return (
        <Row className="justify-content-md-center no-gutters">
            <Col>
                <h1 className="study-section-title py-4 text-center">{title}</h1>
                <a id="studies" />
            </Col>
        </Row>
    )
}

const StudyPanel: React.FC<StudyPanelProps> = props => {
    const { webAppUrl, studies } = props;
    return (
        <Row className="justify-content-md-center py-5 no-gutters">
            <CardDeck>
                {studies && studies.map((item: any, index: any) => {
                    return <StudyCard key={index} webAppUrl={webAppUrl} study={item} />
                })}
            </CardDeck>
        </Row>
    )
}

const HomePage: React.FC<HomePageProps> = props => {
    const { webAppUrl } = props;

    return (
        <Container fluid={true} className="home-page no-gutters px-0">

            <WelcomePanel webAppUrl={webAppUrl} />

            {/*<StudyTitle title="Browse or mine results from Transcriptomics (Mm) and Proteomics (Hs) Studies" />*/}
            <StudyPanel webAppUrl={webAppUrl} studies={_studies} />

        </Container >

    )
}




export default connect<{ webAppUrl: string }, any, {}>(
    (state: any) => ({ webAppUrl: state.globalData.siteConfig.webAppUrl })
)(HomePage);