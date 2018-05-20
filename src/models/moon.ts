import { IPosition, Position } from './position';

export interface IMoon {
    name: string;
    position: IPosition;
    radius: number;
    distanceFromPlanet: number;
}

export class Moon {
    constructor(
        public name: string,
        public position: Position,
        public radius: number,
        public distanceFromPlanet: number
    ) {}
}
