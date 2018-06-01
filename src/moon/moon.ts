import Position from '../common/Position';

export default class Moon {
    public name: string;
    public position: Position;
    public radius: number;
    public distanceFromPlanet: number;

    constructor(moonJson: any) {
        this.name = moonJson.name;
        this.position = new Position(moonJson.position);
        this.radius = moonJson.radius;
        this.distanceFromPlanet = moonJson.distanceFromPlanet;
    }

    public toJSON() {
        return {
            name: this.name,
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            },
            radius: this.radius,
            distanceFromPlanet: this.distanceFromPlanet
        };
    }
}
