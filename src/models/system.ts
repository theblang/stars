import { IPlanet, Planet } from './planet';
import { IPosition, Position } from './position';

export interface ISystem {
    name: string;
    position: IPosition;
    planets: IPlanet[];
}

export class System {
    constructor(
        public name: string,
        public position: Position,
        public planets: Planet[]
    ) {}

    public draw(scene: BABYLON.Scene) {
        const wireframeMaterial = new BABYLON.StandardMaterial(
            'systemMaterial',
            scene
        );
        wireframeMaterial.wireframe = true;
        wireframeMaterial.alpha = 1;
        wireframeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);

        const systemMesh = BABYLON.MeshBuilder.CreatePolyhedron(
            this.name,
            {
                size: 50,
                type: 1
            },
            scene
        );
        systemMesh.material = wireframeMaterial;
        systemMesh.position = new BABYLON.Vector3(
            this.position.x,
            this.position.y,
            this.position.z
        );
    }

    public drawLabel(scene: BABYLON.Scene) {
        const labelMesh = BABYLON.MeshBuilder.CreateGround(
            `${this.name}-label-mesh`,
            { width: 100, height: 50, subdivisions: 25 },
            scene
        );
        const labelTexture = new BABYLON.DynamicTexture(
            `${this.name}-label-texture`,
            {
                width: 100,
                height: 50
            },
            scene,
            false
        );
        labelTexture.drawText(
            'test',
            5,
            20,
            'bold 24px monospace',
            'red',
            'white',
            true,
            true
        );
        const labelMaterial = new BABYLON.StandardMaterial(
            `${this.name}-label-material`,
            scene
        );
        labelMaterial.emissiveTexture = labelTexture;
        labelMesh.material = labelMaterial;
        labelMesh.position = new BABYLON.Vector3(
            this.position.x,
            this.position.y,
            this.position.z + 150
        );
    }

    // public getInterfaceState() {
    //     return {
    //         info: {
    //             name: this.name,
    //             description: `This is system ${this.name}. It has ${
    //                 this.planets.length
    //             } planets.`
    //         },
    //         system_stats: {
    //             num_planets: this.planets.length,
    //             num_moons: this.planets.reduce(
    //                 (sum, planet) => sum + planet.moons.length,
    //                 0
    //             )
    //         }
    //     };
    // }
}
