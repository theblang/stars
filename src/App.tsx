import * as React from 'react';
import './App.css';
import { SceneModel } from './common/SceneModel';
import { GalaxySceneModel } from './galaxy/GalaxySceneModel';
import { Scene } from './Scene';
import Galaxy from './galaxy/Galaxy';
import firestore from './firestore';

export interface AppState {
    sceneModel: SceneModel | undefined;
}

export default class App extends React.Component<{}, AppState> {
    public menuContent: JSX.Element;

    constructor(props: any) {
        super(props);
        this.state = {
            sceneModel: undefined
        };
    }

    public shouldComponentUpdate(
        nextProps: Readonly<{}>,
        nextState: Readonly<AppState>
    ) {
        return nextState.sceneModel !== this.state.sceneModel;
    }

    public async componentDidMount() {
        firestore.settings({ timestampsInSnapshots: true });

        let querySnapshot;
        try {
            querySnapshot = await firestore.collection('galaxies').get();
            const galaxyRef = querySnapshot.docs[0].ref;
            const galaxyDoc = await galaxyRef.get();
            const galaxy = new Galaxy(galaxyDoc.data());
            const galaxySceneModel = new GalaxySceneModel(
                galaxy,
                this.menuContent
            );
            this.setState({ sceneModel: galaxySceneModel });
        } catch {
            // TODO: Show error
        }
    }

    public render() {
        return (
            <div className="App">
                <Scene sceneModel={this.state.sceneModel} />
            </div>
        );
    }
}
