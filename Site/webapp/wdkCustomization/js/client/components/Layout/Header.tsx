import React from 'react';
import { connect } from 'react-redux';
import { UserActions } from 'wdk-client/Actions';
import Menu from './Menu';

export interface User {
    isGuest: boolean;
    id: number;
    email: string;
    properties: {
        firstName: string;
        lastName: string;
        organization: string;
        middleName: string;
        group: string;
    }
}

interface StateProps {
    isPartOfEuPathDB: boolean;
    location: any;
    user: User;
    siteConfig: {
        announcements: any;
        buildNumber: string;
        projectId: string;
        releaseDate: string;
        webAppUrl: string;
    };
}

interface HeaderProps {
    showLoginWarning: any;
    showLoginForm: any;
    showLogoutWarning: any;
    loadBasketCounts: any;
    makeMainMenuItems: any;
}


const Header: React.ComponentClass<HeaderProps> = class extends React.Component<HeaderProps & StateProps> {
    constructor(props: HeaderProps & StateProps) {
        super(props);
    }

    render() {
        const {
            siteConfig,
            user,
            showLoginWarning,
            showLoginForm,
            isPartOfEuPathDB = false,
        } = this.props;

        const {
            announcements,
            projectId,
            webAppUrl
        } = siteConfig;

 
        return (
            <div id="header">
                <Menu webAppUrl={webAppUrl} projectId={projectId} />
            </div>
        )
    }
}


export default connect<StateProps, any, HeaderProps>(
    (state: any) => state.globalData,
    { ...UserActions }
)(Header);