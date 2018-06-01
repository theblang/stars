import Serializable from '../common/Serializable';
import Moon from '../moon/Moon';
import Position from '../common/Position';

export default class Planet implements Serializable<Planet> {
    public name: string;
    public position: Position;
    public radius: number;
    public moons: Moon[];
    public distanceFromSun: number;

    constructor(planetJson: any) {
        this.name = planetJson.name;
        this.position = new Position(planetJson.position);
        this.radius = planetJson.radius;
        this.moons = planetJson.moons.map(
            (moonJson: any) => new Moon(moonJson)
        );
        this.distanceFromSun = planetJson.distanceFromSun;
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
            moons: this.moons.map(moon => moon.toJSON()),
            distanceFromSun: this.distanceFromSun
        };
    }
}
