import { IMoon, Moon } from '../moon/moon';

export interface IPlanet {
    name: string;
    position: BABYLON.Vector3;
    radius: number;
    moons: IMoon[];
    distanceFromSun: number;
}

export class Planet {
    constructor(
        public name: string,
        public position: BABYLON.Vector3,
        public radius: number,
        public moons: Moon[],
        public distanceFromSun: number
    ) {}

    // public getInterfaceState() {
    //     return {
    //         info: {
    //             name: this.name,
    //             description: `This is planet ${this.name}. It is ${this.radius *
    //                 2} big and ${this.distanceFromSun} distance from the sun`
    //         },
    //         // FIXME: Do actual random generation in GeneratorService
    //         climate: {
    //             gravity: Math.floor(Math.random() * 101),
    //             temperature: Math.floor(Math.random() * 101),
    //             radiation: Math.floor(Math.random() * 101)
    //         }
    //     };
    // }
}
