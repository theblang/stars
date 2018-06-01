import Serializable from '../common/Serializable';
import Planet from '../planet/Planet';
import Position from '../common/Position';

export default class System implements Serializable<System> {
    public name: string;
    public position: Position;
    public planets: Planet[];

    constructor(systemJson: any) {
        this.name = systemJson.name;
        this.position = new Position(systemJson.position);
        this.planets = systemJson.planets.map(
            (planetJson: any) => new Planet(planetJson)
        );
    }

    public toJSON() {
        return {
            name: this.name,
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            },
            planets: this.planets.map(planet => planet.toJSON())
        };
    }
}
