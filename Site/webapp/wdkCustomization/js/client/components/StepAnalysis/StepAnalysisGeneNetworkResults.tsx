import { StepAnalysisResultPluginProps } from 'wdk-client/Core/MoveAfterRefactor/Components/StepAnalysis/StepAnalysisResultsPane';
import React, { useState, useEffect, Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { StepAnalysisButtonArray } from './StepAnalysisButtonArray';

require('script-loader!../../../lib/stringdb_combined_embedded_network_v2.0.2.js');

// import './StepAnalysisGeneNetworkResult.css';

interface GeneNetworkResult {
    organism: string;
    genes: string;
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
    genes: string,
) => [
        {
            key: 'stringdb',
            href: `https://string-db.org/cgi/network.pl?identifiers=${genes}`,
            iconClassName: 'fa fa-external-link blue-text',
            contents: 'View on STRING'
        }
    ];


// to set loading flag need to use useState hook
const STRINGNetwork: React.SFC<GeneNetworkResult> = props => {
    const { organism, genes, webAppUrl } = props;

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        if (genes) {
           getSTRING('https://string-db.org', {
                'species': organism,
                'identifiers': genes,
                'network_flavor': 'confidence',
                'caller_identity': webAppUrl,
                'block_structure_pics_in_bubbles': 1
            }).then(function (val) { setLoading(false) }) // callback to set loading = false
        }
    }, []);

    return (
        <Fragment>
            <StepAnalysisButtonArray configs={stepAnalysisButtonConfigFactory(genes)}/>
            <LoadingIndicator loading={loading}></LoadingIndicator>
            <div id="stringEmbedded"></div>
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
                            <Alert variant="warning"> The number of Genes in your result exceeds the display limit (50 IDs). <br />
                                To analyze your gene list with STRING, use the button to view directly on STRING, or <strong>Download</strong> your search result to analyze directly on the STRING website.</Alert>
                            :
                            <STRINGNetwork genes={analysisResult.genes} organism={analysisResult.organism} webAppUrl={webAppUrl} />}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}