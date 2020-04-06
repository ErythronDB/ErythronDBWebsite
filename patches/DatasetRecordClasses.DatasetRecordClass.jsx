import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {pure} from 'wdk-client/ComponentUtils';
import DatasetGraph from 'ebrc-client/components/DatasetGraph';

// Use Element.innerText to strip XML
function stripXML(str) {
  let div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent;
}

function formatLink(link, opts) {
  opts = opts || {};
  let newWindow = !!opts.newWindow;
  return (
    <a href={link.url} target={newWindow ? '_blank' : '_self'}>{stripXML(link.displayText)}</a>
  );
}

function renderDownloadUrl(url) {
  return formatLink(url);
}

function renderPrimaryPublication(publication) {
  return formatLink(publication.pubmed_link, { newWindow: true });
}

function renderPrimaryContact(contact, institution) {
  return contact + ', ' + institution;
}

function renderSourceVersion(version) {
  return (
    <span>
      {version.version}&nbsp;
      <i className="fa fa-question-circle" style={{ color: 'blue' }}
        title={'The data provider\'s version number or publication date, from' +
        ' the site the data was acquired. In the rare case neither is available,' +
        ' the download date.'}/>
    </span>
  );
}

export function RecordHeading(props) {
  let { record, questions, recordClasses } = props;
  let { attributes, tables } = record;
  let {
    summary,
    contact,
    institution,
    organism,
    primary_publication,
    bulk_download_url
    
  } = attributes;

  let version = tables.Version && tables.Version[0];
  let primaryPublication = tables.Publications && tables.Publications[0];

  return (
    <div>
      <props.DefaultComponent {...props}/>
      <div className="wdk-RecordOverview eupathdb-RecordOverview">
        <div className="eupathdb-RecordOverviewItem">
          <strong>Summary: </strong>
          <span style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{__html: summary}}/>
        </div>

        {organism ? (
          <div className="eupathdb-RecordOverviewItem">
            <strong>Organism: </strong>
            <span dangerouslySetInnerHTML={{__html: organism}}/>
          </div>
        ) : null}

        {primary_publication  ? (
          <div className="eupathdb-RecordOverviewItem">
            <strong>Primary publication: </strong>
            <span dangerouslySetInnerHTML={{__html: primary_publication}}/>
          </div>
        ) : null}

        {bulk_download_url ? (
          <div className="eupathdb-RecordOverviewItem">
            <strong>Download Data: </strong>
            <span>{renderDownloadUrl(bulk_download_url)}</span>
          </div>
        ) : null}

        {contact && institution ? (
          <div className="eupathdb-RecordOverviewItem">
            <strong>Primary contact: </strong>
            <span>{renderPrimaryContact(contact, institution)}</span>
          </div>
        ) : null}

      </div>
    </div>
  );
}

const DatasetGraphTable = pure(function DatasetGraphTable(props) {
  return (
    <props.DefaultComponent
      {...props}
      childRow={childProps =>
        <DatasetGraph rowData={props.value[childProps.rowIndex]}/>}
    />
  );
});

function References(props) {
  let {questions, recordClasses, siteConfig} = props;
  if (questions == null || recordClasses == null || siteConfig == null) {
    return null;
  }
  let value = props.value
  .filter(row => row.target_type === 'question')
  .map(row => {
    let name = row.target_name;
    let question = questions.find(q => q.name === name);

    if (question == null) return null;

    let recordClass = recordClasses.find(r => r.name === question.recordClassName);
    let searchName = `Identify ${recordClass.displayNamePlural} by ${question.displayName}`;
    return (
      <li key={name}>
        <a href={`${siteConfig.webAppUrl}/showQuestion.do?questionFullName=${name}`}>{searchName}</a>
      </li>
    );
  });
  return value.length === 0 ? <em>No data available</em> : <ul>{value}</ul>;
}

const ConnectedReferences = connect(
  state => ({
    questions: state.globalData.questions,
    recordClasses: state.globalData.recordClasses,
    siteConfig: state.globalData.siteConfig
  }),
  null
)(References);

export function RecordTable(props) {
  if (props.table.name === 'References') {
    return <ConnectedReferences {...props}/>;
  }
  if (props.table.name === 'ExampleGraphs') {
    return <DatasetGraphTable {...props}/>;
  }
  return <props.DefaultComponent {...props}/>;
}
