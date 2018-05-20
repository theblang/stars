import * as React from 'react';
import './MenuContainer.css';

export interface IMenuProps {
    content: JSX.Element;
}

export class MenuContainer extends React.Component<IMenuProps, {}> {
    public render() {
        return <div className="MenuContainer">{this.props.content}</div>;
    }
}
