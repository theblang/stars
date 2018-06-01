import System from './System';

export class SystemSceneModel {
    public systemMesh: BABYLON.Mesh;
    public systemMaterial: BABYLON.StandardMaterial;
    public focused: boolean;

    constructor(public system: System) {}

    public draw(
        scene: BABYLON.Scene,
        onLeftPickSystem: (
            pickedSystem: SystemSceneModel,
            content: JSX.Element
        ) => void
    ) {}

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
