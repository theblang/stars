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
