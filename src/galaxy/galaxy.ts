import { ISceneEventArgs } from '../Scene';
import { ISystem, System } from '../system/system';

export interface IGalaxy {
    name: string;
    systems: ISystem[];
}

export class Galaxy {
    constructor(public name: string, public systems: System[]) {}

    public onSceneMount = (
        e: ISceneEventArgs,
        setMenuContent: (content: JSX.Element) => void
    ) => {
        const { canvas, scene, engine } = e;

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera(
            'camera1',
            new BABYLON.Vector3(0, 1000, 2000),
            scene
        );

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        // const light = new BABYLON.HemisphericLight(
        //     'light1',
        //     new BABYLON.Vector3(0, 1, 0),
        //     scene
        // );

        // // Default intensity is 1. Let's dim the light a small amount
        // light.intensity = 0.7;

        // Draw systems
        const onLeftPickSystem = (
            pickedSystem: System,
            content: JSX.Element
        ) => {
            setMenuContent(content);
            for (const system of this.systems) {
                if (system.focused && system !== pickedSystem) {
                    system.unfocus();
                }
                pickedSystem.focus();
            }
        };
        for (const system of this.systems) {
            system.draw(scene, onLeftPickSystem);
        }

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    };
}
