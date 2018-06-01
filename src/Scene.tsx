import * as BABYLON from 'babylonjs';
import * as React from 'react';
import './Scene.css';
import { SceneModel } from './common/SceneModel';
import { MenuContainer } from './MenuContainer';

export interface SceneEventArgs {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
}

export interface SceneProps {
    sceneModel: SceneModel | undefined;
    engineOptions?: BABYLON.EngineOptions;
    adaptToDeviceRatio?: boolean;
    width?: number;
    height?: number;
}

export interface SceneState {
    menuContent: JSX.Element;
}

export class Scene extends React.Component<
    SceneProps & React.HTMLAttributes<HTMLCanvasElement>,
    SceneState
> {
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private canvas: HTMLCanvasElement;

    constructor(props: any) {
        super(props);
        this.state = {
            menuContent: <div />
        };
    }

    public setMenuContent = (menuContent: JSX.Element) => {
        this.setState({ menuContent });
    };

    public componentDidMount() {
        this.engine = new BABYLON.Engine(
            this.canvas,
            true,
            this.props.engineOptions,
            this.props.adaptToDeviceRatio
        );

        const scene = new BABYLON.Scene(this.engine);
        this.scene = scene;

        // Resize the babylon engine when the window is resized
        window.addEventListener('resize', this.onResizeWindow);
    }

    public componentWillReceiveProps(nextProps: SceneProps) {
        if (nextProps.sceneModel) {
            nextProps.sceneModel.draw(
                {
                    scene: this.scene,
                    engine: this.engine,
                    canvas: this.canvas
                },
                this.setMenuContent
            );
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeWindow);
    }

    public onResizeWindow = () => {
        if (this.engine) {
            this.engine.resize();
        }
    };

    public onCanvasLoaded = (c: HTMLCanvasElement) => {
        if (c !== null) {
            this.canvas = c;
        }
    };

    public render() {
        // 'rest' can contain additional properties that you can flow through to canvas:
        // (id, className, etc.)
        const { width, height } = this.props;

        const opts: any = {};

        if (width !== undefined && height !== undefined) {
            opts.width = width;
            opts.height = height;
        }

        return (
            <div>
                <canvas className="Scene" {...opts} ref={this.onCanvasLoaded} />
                <MenuContainer menuContent={this.state.menuContent} />
            </div>
        );
    }
}
