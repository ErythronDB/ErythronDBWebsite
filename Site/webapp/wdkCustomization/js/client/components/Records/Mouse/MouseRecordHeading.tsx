import React from "react";
import { connect } from "react-redux";
import HeaderRecordActions from '../RecordHeaderActions';
import { RecordHeaderAttributes, HeaderActions } from '../RecordProps';
import { Link } from 'wdk-client/Components';
import { safeHtml } from "wdk-client/Utils/ComponentUtils";

import Col from 'react-bootstrap/Col';

import { _externalUrls } from '../../../data/_externalUrls'

//import { IgvBrowser } from "../../../Visualizations";

interface StoreProps {
    webAppUrl: string;
}

const enhance = connect<StoreProps, any, RecordHeading>((state: any) => ({
    webAppUrl: state.globalData.siteConfig.webAppUrl,
}));

interface RecordHeading {
    record: RecordHeaderAttributes;
    recordClass: { [key: string]: any };
    headerActions: HeaderActions[];
}

type GeneRecordSummary = StoreProps & RecordHeaderAttributes;

const MouseGeneRecordSummary: React.SFC<RecordHeading & StoreProps> = ({ record, recordClass, headerActions, webAppUrl }) => {
    const flankedStart = +record.attributes.start_min - 10000;
    const flankedEnd = +record.attributes.end_max + 10000;

    return (
        <>
            <Col sm={3}>

                <HeaderRecordActions record={record} recordClass={recordClass} headerActions={headerActions} />
                <h3 className="record-heading mt-3">
                    <strong>{record.attributes.symbol}</strong> / {record.displayName}
                </h3>
               
                <h3 className="mb-3">
                    {record.attributes.product}
                </h3>
              
                <ul>

                    {record.attributes.synonym && (
                        <li>
                            <span className="attribute-label">Also known as</span>: {record.attributes.synonym}
                        </li>
                    )}

                    <li>
                        <span className="attribute-label">Organism</span>: <em>Mus musculus</em>
                    </li>

                    <li>
                        <span className="attribute-label">Gene Type</span>: {record.attributes.gene_type}
                    </li>

                    <li>
                        <span className="attribute-label">Location</span>: {record.attributes.location}
                        {record.attributes.locus
                            ? " / ".concat(record.attributes.locus)
                            : ""}
                        {" / "}<a target="_blank" href={`${_externalUrls.MOUSE_UCSC_BROWSER_URL}${record.attributes.chromosome}:${flankedStart}-${flankedEnd}`} >View on UCSC Genome Browser</a>
                    </li>

                    {record.attributes.ortholog_record_link &&
                        <li>
                            <span className="attribute-label">Human Ortholog</span>:{" "}
                            {safeHtml(record.attributes.ortholog_record_link)}
                        </li>
                    }

                    {record.attributes.note &&
                        <li>
                            <span className="attribute-label note">NOTE</span>:{" "}
                            {safeHtml(record.attributes.note)}
                        </li>
                    }
                    {record.attributes.gene_type === 'protein coding' && 
                    <li>
                        <span className="attribute-label">Known Interactants</span>: <a target="_blank" href={`${_externalUrls.STRING_URL}network/mus_musculus/${record.attributes.source_id}`}>View on STRING</a>
                    </li>
                    }
                </ul>
            </Col>
            
        </>
    );
};

export default enhance(MouseGeneRecordSummary);
