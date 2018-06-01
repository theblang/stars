import * as React from 'react';
import Galaxy from './Galaxy';
import { SceneEventArgs } from '../Scene';
import { SceneModel } from '../common/SceneModel';
import System from '../system/System';
import { GalaxyMenu } from './GalaxyMenu';

export class GalaxySceneModel implements SceneModel {
    private scene: BABYLON.Scene;
    private systemMeshes: BABYLON.Mesh[] = [];
    private defaultColor: BABYLON.Color3 = new BABYLON.Color3(1, 1, 0);
    private setMenuContent: (menuContent: JSX.Element) => void;

    constructor(public galaxy: Galaxy, public menuContent: JSX.Element) {}

    public onLeftPickSystem(system: System, systemMesh: BABYLON.Mesh) {
        this.systemMeshes.forEach(mesh => {
            this.unfocusSystem(system, mesh);
        });
        this.focusSystem(system, systemMesh);
    }

    public focusSystem(system: System, systemMesh: BABYLON.Mesh) {
        const material = new BABYLON.StandardMaterial(
            'focusedSystemMaterial',
            this.scene
        );
        material.wireframe = true;
        material.alpha = 1;
        material.emissiveColor = new BABYLON.Color3(1, 0, 0);

        systemMesh.material = material;

        this.setMenuContent(
            <GalaxyMenu galaxy={this.galaxy} focusedSystem={system} />
        );
    }

    public unfocusSystem(system: System, systemMesh: BABYLON.Mesh) {
        const material = new BABYLON.StandardMaterial(
            'unfocusedSystemMaterial',
            this.scene
        );
        material.wireframe = true;
        material.alpha = 1;
        material.emissiveColor = this.defaultColor;

        systemMesh.material = material;
    }

    public draw(
        e: SceneEventArgs,
        setMenuContent: (menuContent: JSX.Element) => void
    ) {
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
        for (const system of this.galaxy.systems) {
            const systemMesh = BABYLON.MeshBuilder.CreatePolyhedron(
                system.name,
                {
                    size: 50,
                    type: 1
                },
                scene
            );

            const systemMaterial = new BABYLON.StandardMaterial(
                'systemMaterial',
                scene
            );
            systemMaterial.wireframe = true;
            systemMaterial.alpha = 1;
            systemMaterial.emissiveColor = this.defaultColor;

            systemMesh.material = systemMaterial;
            systemMesh.position = new BABYLON.Vector3(
                system.position.x,
                system.position.y,
                system.position.z
            );

            // Add actions
            systemMesh.actionManager = new BABYLON.ActionManager(scene);
            systemMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnLeftPickTrigger,
                    (event: BABYLON.ActionEvent) => {
                        this.onLeftPickSystem(system, systemMesh);
                    }
                )
            );

            this.systemMeshes.push(systemMesh);
        }

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });

        this.scene = scene;
        this.setMenuContent = setMenuContent;
    }
}
