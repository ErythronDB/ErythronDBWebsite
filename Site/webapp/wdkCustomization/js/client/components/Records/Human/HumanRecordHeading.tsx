import React from "react";
import { connect } from "react-redux";
import HeaderRecordActions from '../RecordHeaderActions';
import { RecordHeaderAttributes, HeaderActions } from '../RecordProps';
import { Link } from 'wdk-client/Components';
import { HumanIgvBrowser } from '../../Visualizations/IgvBrowser';
import { safeHtml } from "wdk-client/Utils/ComponentUtils";

import Col from 'react-bootstrap/Col';


//import { IgvBrowser } from "../../../Visualizations";

interface StoreProps {
    externalUrls: { [key: string]: any };
    webAppUrl: string;
}

const enhance = connect<StoreProps, any, RecordHeading>((state: any) => ({
    externalUrls: state.globalData.siteConfig.externalUrls,
    webAppUrl: state.globalData.siteConfig.webAppUrl,
}));

interface RecordHeading {
    record: RecordHeaderAttributes;
    recordClass: { [key: string]: any };
    headerActions: HeaderActions[];
}


type GeneRecordSummary = StoreProps & RecordHeaderAttributes;

const HumanGeneRecordSummary: React.SFC<RecordHeading & StoreProps> = ({ record, recordClass, headerActions, webAppUrl }) => {
    return (
        <>
            <Col sm={3}>

                <HeaderRecordActions record={record} recordClass={recordClass} headerActions={headerActions} />
                <h3 className="record-heading mt-3">
                    <strong>{record.attributes.symbol}</strong> / {record.displayName}
                </h3>
                <h2>
                    {record.attributes.product}
                </h2>
                <ul>

                    {record.attributes.synonym && (
                        <li>
                            <span className="attribute-label">Also known as</span>: {record.attributes.synonym}
                        </li>
                    )}

                    <li>
                        <span className="attribute-label">Organism</span>: <em>Homo sapiens</em>
                    </li>

                    <li>
                        <span className="attribute-label">Gene Type</span>: {record.attributes.gene_type}
                    </li>

                    <li>
                        <span className="attribute-label">Location</span>: {record.attributes.location}{" "}
                        {record.attributes.locus
                            ? "/ ".concat(record.attributes.locus)
                            : ""}
                    </li>

                    {record.attributes.ortholog_record_link &&
                        <li>
                            <span className="attribute-label">Mouse Ortholog</span>:{" "}
                            {safeHtml(record.attributes.ortholog_record_link)}
                        </li>
                    }
                </ul>
            </Col>
            <Col>
                <HumanIgvBrowser webAppUrl={webAppUrl} defaultLocus={record.attributes.source_id}/>
            </Col>
        </>
    );
};

export default enhance(HumanGeneRecordSummary);
