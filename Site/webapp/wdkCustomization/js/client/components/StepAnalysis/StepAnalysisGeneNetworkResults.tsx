import { StepAnalysisResultPluginProps } from 'wdk-client/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisResultsPane';
import React, { useState, useEffect, Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StepAnalysisButtonArray } from './StepAnalysisButtonArray';

import { _externalUrls } from "../../data/_externalUrls";

require('script-loader!../../../lib/stringdb_combined_embedded_network_v2.0.2.js');

// import './StepAnalysisGeneNetworkResult.css';

const RESULT_SIZE_LIMIT = 200;


//@ts-ignore
const SvgInline = props => {
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [props.url]);

    return (
        <>
            <LoadingIndicator loading={!isLoaded}></LoadingIndicator>
            <div
                className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </>
    );
}

interface GeneNetworkResult {
    organism: string;
    genes: String[];
    webAppUrl: string;
}

interface LoadingIndicatorProps {
    loading: boolean
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = props => {
    const { loading } = props;
    return loading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
        : null;
}

const stepAnalysisButtonConfigFactory = (
    genes: String[], organism: string
) => [
        {
            key: 'stringdb',
            href: `${_externalUrls.STRING_URL}cgi/network.pl?species=${organism}&identifiers=${genes.join("%0d")}`,
            iconClassName: 'fa fa-external-link',
            contents: 'View at STRING'
        }
    ];


// to set loading flag need to use useState hook
const STRINGNetwork: React.SFC<GeneNetworkResult> = props => {
    const { organism, genes, webAppUrl } = props;

    const optionalParams = "network_flavor=confidence&block_structure_pics_in_bubbles=1&caller_identity=ErythronDB";
    const url = _externalUrls.STRING_URL + "api/svg/network?species=" + organism + "&identifiers=" + genes.join("%0d") + "&" + optionalParams;

    return (
        <Fragment>
            <SvgInline url={url} />
        </Fragment>
    );
}

export const StepAnalysisGeneNetworkResults: React.FC<StepAnalysisResultPluginProps> = ({
    analysisResult,
    analysisConfig,
    webAppUrl
}) => {

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col>
                        {analysisResult.exceedsLimit ?
                            <Alert variant="warning"> The number of Genes in your result exceeds the display limit ({RESULT_SIZE_LIMIT} IDs). <br />
                                Please filter your result set or or <strong>Download</strong> your search result to get the full list of gene identifiers and analyze directly on the STRING website.</Alert>
                            :
                            <div>
                                <StepAnalysisButtonArray configs={stepAnalysisButtonConfigFactory(analysisResult.genes, analysisResult.organism)} />
                                <STRINGNetwork genes={analysisResult.genes} organism={analysisResult.organism} webAppUrl={webAppUrl} />  
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}