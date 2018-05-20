import * as React from 'react';
import { ISystem } from './system';

export interface ISystemMenuProps {
    system: ISystem;
}

export class SystemMenu extends React.Component<ISystemMenuProps, {}> {
    public render() {
        return (
            <div className="SystemMenu">
                <p>Name: {this.props.system.name}</p>
                <p>
                    This is system {this.props.system.name}. It has{' '}
                    {this.props.system.planets.length} planets
                </p>
            </div>
        );
    }
}
