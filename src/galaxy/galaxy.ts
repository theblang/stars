import Serializable from '../common/Serializable';
import System from '../system/System';

export default class Galaxy implements Serializable<Galaxy> {
    public name: string;
    public systems: System[];

    constructor(galaxyJson: any) {
        this.name = galaxyJson.name;
        this.systems = galaxyJson.systems.map(
            (systemJson: any) => new System(systemJson)
        );
    }

    public toJSON() {
        return {
            name: this.name,
            systems: this.systems.map(system => system.toJSON())
        };
    }
}
