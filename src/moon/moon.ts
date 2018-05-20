export interface IMoon {
    name: string;
    position: BABYLON.Vector3;
    radius: number;
    distanceFromPlanet: number;
}

export class Moon {
    constructor(
        public name: string,
        public position: BABYLON.Vector3,
        public radius: number,
        public distanceFromPlanet: number
    ) {}
}
