import React from 'react';
import { Link, HelpIcon } from 'wdk-client/Components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { _SEARCH_TYPE_MAP, DatasetSearchProps } from '../../data/constants';
import { nullValue } from 'wdk-client/Utils/Json';
import { StringifyOptions } from 'querystring';


interface DatasetItemProps {
    comparison_tooltip: string;
    default_experiment: string;
    title?: string[];
    search: string[];
}

interface StudyItemProps {
    type: string;
    type_display: string;
    display_name: string,
    description: string,
    dataset_id: string,
    accession?: string,
    taxon_abbrev: string,
    attribution: string,
    accession_ref?: string,
    display_summary: string,
    default_search_description?: string,
    individual_datasets: DatasetItemProps,
}

interface StudyCardProps {
    webAppUrl: string;
    study: StudyItemProps;
}

interface SearchButtonProps {
    study_id: string;
    defaultExperiment: string;
    searchKey: string;
    popoverText?: string;
    webAppUrl?: string;
}

interface SearchButtonGroupProps {
    webAppUrl?: string;
    study: StudyItemProps;
}

const SearchButton: React.SFC<SearchButtonProps> = props => {
    const { webAppUrl, study_id, popoverText, searchKey, defaultExperiment } = props;

 
    function isKeyOf<T extends object>(obj: T, possibleKey: keyof any): possibleKey is keyof T {
        return possibleKey in obj;
    }

    const search_type = (isKeyOf(_SEARCH_TYPE_MAP, searchKey)) ? _SEARCH_TYPE_MAP[searchKey] : _SEARCH_TYPE_MAP.dexp;

    return (
        <ButtonGroup className="mr-2">
            <OverlayTrigger key={`${study_id}_${search_type.internal}`} placement="top"
                overlay={
                    <Popover id={`${study_id}_${search_type.internal}`}>
                        <Popover.Title as="h3">{search_type.title}</Popover.Title>
                        {popoverText ? <Popover.Content>{popoverText}</Popover.Content>
                        : <Popover.Content>{search_type.description}</Popover.Content>}
                    </Popover>
                }>

                <Button id={`${study_id}_${search_type.internal}`} variant="secondary" className="card-search" 
                        href={`${webAppUrl}/app/search/gene/${search_type.name}?param.investigation=${study_id}&param.experimet=${defaultExperiment}`}>
                    <i className={`fa ${search_type.icon}`}></i>
                </Button>
            </OverlayTrigger>
        </ButtonGroup>
    )
}

const SearchButtonGroup: React.SFC<SearchButtonGroupProps> = props => {
    const { webAppUrl, study } = props;

    return (
        <ButtonToolbar className="justify-content-md-center">
            {study.individual_datasets && study.individual_datasets.search.map((item: string, index: any) => {
                return (item === 'dexp' || item === 'mdexp'
                    ? <SearchButton webAppUrl={webAppUrl} key={index} searchKey={item} study_id={study.dataset_id} 
                        popoverText={study.individual_datasets.comparison_tooltip}
                        defaultExperiment={study.individual_datasets.default_experiment}>
                        </SearchButton>
                    : <SearchButton webAppUrl={webAppUrl} key={index} searchKey={item} study_id={study.dataset_id}
                        defaultExperiment={study.individual_datasets.default_experiment}></SearchButton>)
            })
            }
        </ButtonToolbar>
    )
}



const StudyCard: React.SFC<StudyCardProps> = props => {
    const { webAppUrl, study } = props;
    return (
        <Card className="study-card border-info">
            <Card.Header className="bg-primary text-light">
                <Card.Title>{study.display_name}</Card.Title>
            </Card.Header>

            <Card.Body className="bg-light">
                <Card.Subtitle className="mb-2 attribution text-primary">{study.attribution}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-primary">{study.type_display} ({study.taxon_abbrev})</Card.Subtitle>
                <Card.Text className="lead">
                    {study.display_summary}
                </Card.Text>

                <Link to={`record/dataset/${study.dataset_id}`} className="card-link">View study details <i className="fa fa-caret-right"></i></Link>
            </Card.Body>

            <Card.Footer className="bg-white text-primary">
                <SearchButtonGroup webAppUrl={webAppUrl} study={study} ></SearchButtonGroup>
            </Card.Footer>
        </Card >

    )
}

export default StudyCard;
