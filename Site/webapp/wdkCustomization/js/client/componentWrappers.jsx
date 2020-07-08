
import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'querystring';
import { emptyAction } from 'wdk-client/Core/WdkMiddleware';
import { Link } from 'wdk-client/Components';
import { getSingleRecordAnswerSpec } from 'wdk-client/Utils/WdkModel';

import ErythronDBFooter from './components/Layout/Footer';
import ErythronDBHeader from './components/Layout/Header';

import newFeatureImage from 'wdk-client/Core/Style/images/new-feature.png';

export const SiteHeader = () => ErythronDBHeader;
export const Footer = () => ErythronDBFooter; 

const stopPropagation = event => event.stopPropagation();

function downloadRecordTable(record, tableName) {
  return ({ wdkService }) => {
    let answerSpec = getSingleRecordAnswerSpec(record);
    let formatting = {
      format: 'tableTabular',
      formatConfig: {
        tables: [tableName],
        includeHeader: true,
        attachmentType: "text"
      }
    };
    wdkService.downloadAnswer({ answerSpec, formatting });
    return emptyAction;
  };
}

export function RecordTableSection(DefaultComponent) {
  return connect(null, { downloadRecordTable })(class ErythronDBRecordTableSection extends React.PureComponent {
    render() {
      if (this.props.recordClass.name === 'DatasetRecordClasses.DatasetRecordClass') {
        return (
          <DefaultComponent {...this.props} />
        );
      }

      let { table, record, downloadRecordTable, ontologyProperties } = this.props;
      let customName = `Data Sets used to generate ${String.fromCharCode(8220)}${table.displayName.replace('/', '-')}${String.fromCharCode(8221)}`
      let callDownloadTable = event => {
        event.stopPropagation();
        downloadRecordTable(record, table.name);
      };

      let showDownload = (
        record.tables[table.name] &&
        record.tables[table.name].length > 0 &&
        ontologyProperties.scope.includes('download')
      );


      let hideDatasetLinkFromProperty = (
        record.tables[table.name] &&
        table.properties.hideDatasetLink &&
        table.properties.hideDatasetLink[0].toLowerCase() == 'true'
      );

      let showNewFeature = (
        record.tables[table.name] &&
        table.name == 'TranscriptionSummary'
      );

      let showDatasetsLink = (
        record.tables[table.name] &&
        !table.name.startsWith("UserDatasets") &&
        !hideDatasetLinkFromProperty
      );


      var hasTaxonId = 0;

      return (
        <DefaultComponent {...this.props} table={Object.assign({}, table, {
          displayName: (
            <span>
              {table.displayName}
              {showNewFeature &&
                <img src={newFeatureImage} />
              }
              {showDownload &&
                <span
                  style={{
                    fontSize: '.8em',
                    fontWeight: 'normal',
                    marginLeft: '1em'
                  }}>
                  <button type="button"
                    className="wdk-Link"
                    onClick={callDownloadTable}>
                    <i className="fa fa-download" /> Download
                  </button>
                </span>
              }
              {hasTaxonId == 0 && showDatasetsLink &&
                <Link
                  style={{
                    fontSize: '.8em',
                    fontWeight: 'normal',
                    marginLeft: '1em'
                  }}
                  onClick={stopPropagation}
                  to={{
                    pathname: `/search/dataset/DatasetsByReferenceName:${customName}/result`,
                    search: QueryString.stringify({
                      record_class: record.recordClassName,
                      reference_name: table.name,
                    })
                  }}
                ><i className="fa fa-database" /> Data Sets</Link>}
              {hasTaxonId == 1 && showDatasetsLink &&
                <Link
                  style={{
                    fontSize: '.8em',
                    fontWeight: 'normal',
                    marginLeft: '1em'
                  }}
                  onClick={stopPropagation}
                  to={{
                    pathname: `/search/dataset/DatasetsByReferenceName:${customName}/result`,
                    search: QueryString.stringify({
                      record_class: record.recordClassName,
                      reference_name: table.name,
                      taxon: record.attributes.organism_full
                    })
                  }}
                ><i className="fa fa-database" /> Data sets</Link>}

            </span>
          )
        })} />
      );
    }
  });
}