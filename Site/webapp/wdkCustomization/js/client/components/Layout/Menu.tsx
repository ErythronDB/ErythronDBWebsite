import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { _studies } from '../../data/studies';
import { _workspace, _about } from '../../data/menu';
import { StateProps } from './Header';
import AutoCompleteSearch from '../Components/AutoCompleteSearch/AutoCompleteSearch';
import { Link, HelpIcon, Icon } from 'wdk-client/Components';

import { showLoginForm, showLogoutWarning } from 'wdk-client/Actions/UserSessionActions';
import { DispatchAction } from 'wdk-client/Core/CommonTypes';
import { User } from 'wdk-client/Utils/WdkUser';

import {
    SubmissionMetadata,
    submitQuestion,
    updateParamValue,
    updateActiveQuestion
} from "wdk-client/Actions/QuestionActions";
import { QuestionState } from "wdk-client/StoreModules/QuestionStoreModule";

import Button from 'react-bootstrap/Button';



interface DispatchProps {
    actions?: {
        showLoginForm: (url?: string) => void,
        showLogoutWarning: () => void
    }
};

type MenuProps = DispatchProps & StateProps;

interface MenuItemProps extends StateProps {
    id?: string;
    text?: string;
    tooltip?: string;
    route?: string;
    url?: string;
}

interface StudyMenuItemProps {
    menu_text: string,
    description: string,
    dataset_id: string,
}

interface DropDownMenuProps extends StateProps {
    text: string;
    items?: MenuItemProps[];
    studyItems?: StudyMenuItemProps[];
    type?: string;
}

interface UserMenuProps {
    user: User;
}

const MenuItem: React.ComponentClass<MenuItemProps> = class extends React.Component<MenuItemProps> {
    constructor(props: MenuItemProps) {
        super(props);
    }
    render() {
        const {
            url,
            tooltip,
            text,
            route,
            webAppUrl
        } = this.props;

        return (
            <li className="nav-item">
                {url ?
                    <a title={tooltip} href={`${webAppUrl}${url}`} className="nav-link">{text}</a>
                    : <Link to={route} className="nav-link">{text}</Link>
                }
            </li>
        )
    }
}

const DropDownMenuItem: React.ComponentClass<MenuItemProps> = class extends React.Component<MenuItemProps> {
    constructor(props: MenuItemProps) {
        super(props);
    }

    render() {
        const {
            url,
            tooltip,
            text,
            route,
            webAppUrl
        } = this.props;

        return (
            url ?
                <a title={tooltip} href={`${webAppUrl}/${url}`} className="dropdown-item">{text}</a>
                : <Link to={route} className="dropdown-item">{text}</Link>

        )
    }
}

const DropDownMenu: React.ComponentClass<DropDownMenuProps> = class extends React.Component<DropDownMenuProps> {
    constructor(props: DropDownMenuProps) {
        super(props);
    }
    render() {
        const {
            text,
            items,
            webAppUrl
        } = this.props

        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {text}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {items.map((item: any, index: any) => {
                        return <DropDownMenuItem key={index} url={item.url} route={item.route} text={item.text} webAppUrl={webAppUrl} />
                    })
                    }
                </div>
            </li>

        )
    }
}


const UserMenu: React.ComponentClass<UserMenuProps> = class extends React.Component<UserMenuProps> {
    constructor(props: UserMenuProps) {
        super(props);
    }
    render() {
        const {
            user
        } = this.props

        let userName = user ? user.properties.firstName + " " + user.properties.lastName : null;

        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle"></i> {userName}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <DropDownMenuItem route="/favorites" text="Favorites" />
                </div>
            </li>
        )
    }
}


const DropDownStudyMenu: React.ComponentClass<DropDownMenuProps> = class extends React.Component<DropDownMenuProps> {
    constructor(props: DropDownMenuProps) {
        super(props);
    }
    render() {
        const {
            text,
            studyItems,
            type,
            webAppUrl
        } = this.props

        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {text}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {studyItems.map((item: any, index: any) => {
                        return item.type === type && <DropDownMenuItem key={index} route={`/record/dataset/${item.dataset_id}`} text={item.menu_text} webAppUrl={webAppUrl} />
                    })
                    }
                </div>
            </li>

        )
    }
}

const MenuSearch: React.FC<{ webAppUrl: string }> = (props: { webAppUrl: string }) => {
    return (
        <form className="form-inline my-2 my-lg-0" method="GET" action={`${props.webAppUrl}/app/search/gene/id`}>
            <input type="hidden" name="autoRun" />
            <label htmlFor="menu-search-input" className="mr-3">
                <HelpIcon>
                    <div>
                        <p>Search for a gene by entering the official gene symbol, NCBI Entrez Gene, MGI, or Ensembl gene identifier in the search box
                    or click on the <i className="fa fa-upload"></i> button to upload a list of genes.</p>
                        <p>Gene symbol searches are case sensitive; e.g., GATA1 - human, Gata1 - mouse.</p>
                    </div>
                </HelpIcon>
            </label>

            <input id="menu-search-input" className="form-control" type="text" placeholder="Search for a gene..." name="param.generic_gene_identifier" aria-label="GeneSearch" />
            <button type="submit" id="menu-search-submit" className="btn btn-info text-white"><i className="fa fa-search"></i></button>
        </form>
    )
}


const Menu: React.ComponentClass<MenuProps> = class extends React.Component<MenuProps> {
    constructor(props: MenuProps) {
        super(props)
    }

    render() {
        const {
            projectId,
            user,
            actions,
            webAppUrl
        } = this.props;

        const {
            showLoginForm,
            showLogoutWarning
        } = actions;

        // const isGuest = get(user, 'isGuest', false);
        const isGuest = user && user.isGuest ? true : false;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand text-primary" to="/">ErythronDB</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-collapse" aria-controls="menu-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menu-collapse">
                    <ul className="navbar-nav mr-auto">
                        <DropDownStudyMenu text="Transcriptomics (Mm)" studyItems={_studies} type="transcriptomics" webAppUrl={webAppUrl} />
                        <DropDownStudyMenu text="Proteomics (Hs)" studyItems={_studies} type="proteomics" webAppUrl={webAppUrl} />
                        <DropDownMenu text="Workspace" items={_workspace} webAppUrl={webAppUrl} />
                        <DropDownMenu text="About" items={_about} webAppUrl={webAppUrl} />
                        {!isGuest && <UserMenu user={user}></UserMenu>}
                    </ul>
                    <HelpIcon>
                        <div>
                            <p>Search for a gene by keyword or identifier (official gene symbol, NCBI Entrez Gene, MGI, or Ensembl).</p>
                            <p>Click on the <i className="fa fa-upload"></i> button to upload a list of genes.</p>
                        </div>
                    </HelpIcon>
                    <AutoCompleteSearch canGrow={true} />
                    {/*<MenuSearch webAppUrl={webAppUrl} />*/}
                </div>
                <Button variant="info" href={`${webAppUrl}/app/search/gene/upload`} id="menu-upload-button" title="Upload a list of genes." disabled>
                    <i className="fa fa-upload"></i>
                </Button>
                {isGuest && <Button variant="link" onClick={() => showLoginForm(window.location.href)}>Sign In</Button>}
                {isGuest && <Button variant="outline-warning" href={`${webAppUrl}/app/user/registration`} disabled>Sign Up</Button>}

                {!isGuest && <Button variant="link" onClick={() => showLogoutWarning()}>Logout</Button>}
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch: DispatchAction): DispatchProps => ({
    actions: {
        showLoginForm: (url?: string) => dispatch(showLoginForm(url)),
        showLogoutWarning: () => dispatch(showLogoutWarning())
    }
});



export default connect(null, mapDispatchToProps)(Menu);