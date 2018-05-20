import * as React from 'react';
import { IPlanet, Planet } from '../planet/planet';
import { ISceneEventArgs } from '../Scene';
import { SystemMenu } from './SystemMenu';

export interface ISystem {
    name: string;
    position: BABYLON.Vector3;
    planets: IPlanet[];
}

export class System {
    public systemMesh: BABYLON.Mesh;
    public systemMaterial: BABYLON.StandardMaterial;
    public focused: boolean;

    constructor(
        public name: string,
        public position: BABYLON.Vector3,
        public planets: Planet[]
    ) {}

    public onSceneMount = (e: ISceneEventArgs) => {};

    public draw(
        scene: BABYLON.Scene,
        onLeftPickSystem: (pickedSystem: System, content: JSX.Element) => void
    ) {
        this.systemMaterial = new BABYLON.StandardMaterial(
            'systemMaterial',
            scene
        );
        this.systemMaterial.wireframe = true;
        this.systemMaterial.alpha = 1;
        this.systemMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);

        this.systemMesh = BABYLON.MeshBuilder.CreatePolyhedron(
            this.name,
            {
                size: 50,
                type: 1
            },
            scene
        );
        this.systemMesh.material = this.systemMaterial;
        this.systemMesh.position = new BABYLON.Vector3(
            this.position.x,
            this.position.y,
            this.position.z
        );

        // Add actions
        this.systemMesh.actionManager = new BABYLON.ActionManager(scene);
        this.systemMesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnLeftPickTrigger,
                () => {
                    this.systemMaterial.emissiveColor = new BABYLON.Color3(
                        1,
                        0,
                        0
                    );
                    onLeftPickSystem(this, <SystemMenu system={this} />);
                }
            )
        );
    }

    public focus() {
        if (this.systemMaterial) {
            this.focused = true;
            this.systemMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
        }
    }

    public unfocus() {
        if (this.focused) {
            this.focused = false;
            this.systemMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);
        }
    }

    // public drawLabel(scene: BABYLON.Scene) {
    //     const labelMesh = BABYLON.MeshBuilder.CreateGround(
    //         `${this.name}-label-mesh`,
    //         { width: 100, height: 50, subdivisions: 25 },
    //         scene
    //     );
    //     const labelTexture = new BABYLON.DynamicTexture(
    //         `${this.name}-label-texture`,
    //         {
    //             width: 100,
    //             height: 50
    //         },
    //         scene,
    //         false
    //     );
    //     labelTexture.drawText(
    //         'test',
    //         5,
    //         20,
    //         'bold 24px monospace',
    //         'red',
    //         'white',
    //         true,
    //         true
    //     );
    //     const labelMaterial = new BABYLON.StandardMaterial(
    //         `${this.name}-label-material`,
    //         scene
    //     );
    //     labelMaterial.emissiveTexture = labelTexture;
    //     labelMesh.material = labelMaterial;
    //     labelMesh.position = new BABYLON.Vector3(
    //         this.position.x,
    //         this.position.y,
    //         this.position.z + 150
    //     );
    // }
}
