import Serializable from './Serializable';

export default class Position implements Serializable<Position> {
    public x: number;
    public y: number;
    public z: number;

    constructor(json: any) {
        this.x = json.x;
        this.y = json.y;
        this.z = json.z;
    }

    public toJSON() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
}
