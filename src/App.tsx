import * as React from 'react';
import './App.css';
import Generator from './generator';
import { Galaxy } from './galaxy/galaxy';
import { Scene, ISceneEventArgs } from './Scene';
import { MenuContainer } from './MenuContainer';

interface IAppState {
    content: JSX.Element;
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            content: <div />
        };
    }

    public onSceneMount = (e: ISceneEventArgs) => {
        const galaxy: Galaxy = Generator.generateGalaxy();
        galaxy.onSceneMount(e, this.setMenuContent);
    };

    public setMenuContent = (content: JSX.Element) => {
        this.setState({ content });
    };

    public render() {
        return (
            <div className="App">
                <Scene onSceneMount={this.onSceneMount} />
                <MenuContainer content={this.state.content} />
            </div>
        );
    }
}

export default App;
