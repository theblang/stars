import * as React from 'react';
import System from '../system/System';

export interface FocusedSystemMenuProps {
    system: System;
}

export class FocusedSystemMenu extends React.Component<
    FocusedSystemMenuProps,
    {}
> {
    public render() {
        return (
            <div>
                <p>Name: {this.props.system.name}</p>
                <p>
                    This is system {this.props.system.name}. It has{' '}
                    {this.props.system.planets.length} planets
                </p>
                <button>Enter</button>
            </div>
        );
    }
}
