import * as React from 'react';
import System from './System';

export interface SystemMenuProps {
    system: System;
}

export class SystemMenu extends React.Component<SystemMenuProps, {}> {
    public render() {
        return (
            <div>
                <p>Name: {this.props.system.name}</p>
                <p>
                    This is system {this.props.system.name}. It has{' '}
                    {this.props.system.planets.length} planets
                </p>
            </div>
        );
    }
}
