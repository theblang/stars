import * as React from 'react';
import './MenuContainer.css';

export interface MenuProps {
    menuContent: JSX.Element;
}

export class MenuContainer extends React.Component<MenuProps, {}> {
    public render() {
        return <div className="MenuContainer">{this.props.menuContent}</div>;
    }
}
