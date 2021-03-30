import React from "react";
import { connect } from "react-redux";
import HeaderRecordActions from '../RecordHeaderActions';
import { RecordHeaderAttributes, HeaderActions } from '../RecordProps';
import { Link } from 'wdk-client/Components';
import { safeHtml } from "wdk-client/Utils/ComponentUtils";
import { MouseIgvBrowser } from '../../Visualizations/IgvBrowser';

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

const MouseGeneRecordSummary: React.SFC<RecordHeading & StoreProps> = ({ record, recordClass, headerActions, webAppUrl }) => {
    return (
        <>
            <Col sm={3}>

                <HeaderRecordActions record={record} recordClass={recordClass} headerActions={headerActions} />
                <h1 className="record-heading mt-3">
                    {record.attributes.symbol} - {record.displayName}
                </h1>
                <h2>
                    {record.attributes.product}
                </h2>
                <ul>

                    {record.attributes.synonym && (
                        <li>
                            <span className="label">Also known as</span>: {record.attributes.synonym}
                        </li>
                    )}

                    <li>
                        <span className="label">Organism</span>: <em>Mus musculus</em>
                    </li>

                    <li>
                        <span className="label">Gene Type</span>: {record.attributes.gene_type}
                    </li>

                    <li>
                        <span className="label">Location</span>: {record.attributes.location}{" "}
                        {record.attributes.locus
                            ? "/ ".concat(record.attributes.locus)
                            : ""}
                    </li>

                    {record.attributes.ortholog_record_link &&
                        <li>
                            <span className="label">Human Ortholog</span>:{" "}
                            {safeHtml(record.attributes.ortholog_record_link)}
                        </li>
                    }
                </ul>
            </Col>
            <Col>
               <MouseIgvBrowser webAppUrl={webAppUrl} defaultLocus={record.attributes.source_id}/>
            </Col>
        </>
    );
};

export default enhance(MouseGeneRecordSummary);
