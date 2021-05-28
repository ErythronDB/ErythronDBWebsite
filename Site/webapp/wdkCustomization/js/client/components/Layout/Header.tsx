import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';

import { User } from 'wdk-client/Utils/WdkUser';
import { RootState } from 'wdk-client/Core/State/Types';

export interface StateProps {
    user?: User,
    webAppUrl?: string,
    projectId?: string
};


const Header: React.ComponentClass<StateProps> = class extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    render() {
        const {
            user,
            webAppUrl,
            projectId
        } = this.props;

        return (
            <header className="ebrc-Header">
                
                <Menu webAppUrl={webAppUrl} projectId={projectId} user={user} />
            </header>
        )
    }
}


const mapStateToProps = (state: RootState): StateProps => ({
    user: state.globalData.user,
    webAppUrl: state.globalData.siteConfig.webAppUrl,
    projectId: state.globalData.siteConfig.projectId
});



export default connect(mapStateToProps)(Header);