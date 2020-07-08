import React from 'react';


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


export function RecordTable(props) {
  return <props.DefaultComponent {...props}/>;
}
