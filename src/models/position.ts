export interface IPosition {
    x: number;
    y: number;
    z: number;
}

export class Position {
    constructor(public x: number, public y: number, public z: number) {}
}
