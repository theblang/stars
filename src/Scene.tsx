import * as BABYLON from 'babylonjs';
import * as React from 'react';
import './Scene.css';

export interface ISceneEventArgs {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
}

export interface ISceneProps {
    engineOptions?: BABYLON.EngineOptions;
    adaptToDeviceRatio?: boolean;
    onSceneMount?: (args: ISceneEventArgs) => void;
    width?: number;
    height?: number;
}

export class Scene extends React.Component<
    ISceneProps & React.HTMLAttributes<HTMLCanvasElement>,
    {}
> {
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private canvas: HTMLCanvasElement;

    public onResizeWindow = () => {
        if (this.engine) {
            this.engine.resize();
        }
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

        if (typeof this.props.onSceneMount === 'function') {
            this.props.onSceneMount({
                canvas: this.canvas,
                engine: this.engine,
                scene: this.scene
            });
        } else {
            // console.error('onSceneMount function not available');
        }

        // Resize the babylon engine when the window is resized
        window.addEventListener('resize', this.onResizeWindow);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeWindow);
    }

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

        return <canvas className="Scene" {...opts} ref={this.onCanvasLoaded} />;
    }
}
