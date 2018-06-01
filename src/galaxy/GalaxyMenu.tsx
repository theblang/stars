import * as React from 'react';
import Galaxy from './Galaxy';
import System from '../system/System';

export interface GalaxyMenuProps {
    galaxy: Galaxy;
    focusedSystem: System;
}

export class GalaxyMenu extends React.Component<GalaxyMenuProps, {}> {
    public render() {
        return (
            <div>
                <p>Name: {this.props.focusedSystem.name}</p>
                <p>
                    This is system {this.props.focusedSystem.name}. It has{' '}
                    {this.props.focusedSystem.planets.length} planets
                </p>
            </div>
        );
    }
}
