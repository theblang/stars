import { Galaxy } from './galaxy/galaxy';
import { Moon } from './moon/moon';
import { Planet } from './planet/planet';
import { System } from './system/system';
import { Vector3 } from 'babylonjs';

export default class Generator {
    public static generateGalaxy(): Galaxy {
        const numSystemsMin = 3;
        const numSystemsMax = 8;
        // const systemDistanceMin = 300;
        // const systemDistanceMax = 600;
        const systemDistance = 500; // being lazy at the moment

        const numPlanetsMin = 3;
        const numPlanetsMax = 12;
        const planetRadiusMin = 50;
        const planetRadiusMax = 150;
        const planetOrbitIncrementMin = 300;
        const planetOrbitIncrementMax = 700;

        const numMoonsMin = 0;
        const numMoonsMax = 4;
        const moonRadiusMin = 10;
        const moonRadiusMax = 30;
        const moonOrbitIncrementMin = 50;
        const moonOrbitIncrementMax = 80;

        // Generate systems
        const systems = [];
        const numSystems = Generator.getRandomIntInclusive(
            numSystemsMin,
            numSystemsMax
        );

        for (let i = 0; i <= numSystems; i++) {
            const systemName = `s${i}`;

            // Generate position of system in the galaxy view
            const systemX =
                Generator.getRandomIntInclusive(
                    0,
                    systemDistance + systemDistance
                ) - systemDistance;
            const systemY =
                Generator.getRandomIntInclusive(
                    0,
                    systemDistance + systemDistance
                ) - systemDistance;
            const systemZ =
                Generator.getRandomIntInclusive(
                    0,
                    systemDistance + systemDistance
                ) - systemDistance;

            // Generate planets
            const planets = [];
            const numPlanets = Generator.getRandomIntInclusive(
                numPlanetsMin,
                numPlanetsMax
            );
            let planetDistanceFromSun = 0; // total distance between center of planet and center of sun

            for (let j = 0; j <= numPlanets; j++) {
                planetDistanceFromSun += Generator.getRandomIntInclusive(
                    planetOrbitIncrementMin,
                    planetOrbitIncrementMax
                );
                const planetName = `s${i}-p${j}`;

                // Generate random position on the orbit
                // See http://math.stackexchange.com/a/253113/52104
                const planetAngle = Math.random() * Math.PI * 2;
                const planetX = Math.cos(planetAngle) * planetDistanceFromSun;
                const planetY = 0;
                const planetZ = Math.sin(planetAngle) * planetDistanceFromSun;
                const planetPosition = new Vector3(planetX, planetY, planetZ);

                // Generate random radius
                const planetRadius =
                    Generator.getRandomIntInclusive(
                        0,
                        planetRadiusMax - planetRadiusMin
                    ) + planetRadiusMin;

                // Generate moons
                const moons = [];
                const numMoons = Generator.getRandomIntInclusive(
                    numMoonsMin,
                    numMoonsMax
                );
                let moonDistanceFromPlanet = planetRadius;

                for (let k = 0; k <= numMoons; k++) {
                    moonDistanceFromPlanet += Generator.getRandomIntInclusive(
                        moonOrbitIncrementMin,
                        moonOrbitIncrementMax
                    );
                    const moonName = `s${i}-p${j}-m${k}`;

                    // Generate random position on the orbit
                    const moonAngle = Math.random() * Math.PI * 2;
                    const moonX = Math.cos(moonAngle) * moonDistanceFromPlanet;
                    const moonY = 0;
                    const moonZ = Math.sin(moonAngle) * moonDistanceFromPlanet;
                    const moonPosition = new Vector3(
                        moonX + planetX,
                        moonY + planetY,
                        moonZ + planetZ
                    );

                    // Generate random radius
                    const moonRadius =
                        Generator.getRandomIntInclusive(
                            0,
                            moonRadiusMax - moonRadiusMin
                        ) + moonRadiusMin;

                    moons.push(
                        new Moon(
                            moonName,
                            moonPosition,
                            moonRadius,
                            moonDistanceFromPlanet
                        )
                    );
                }

                planets.push(
                    new Planet(
                        planetName,
                        planetPosition,
                        planetRadius,
                        moons,
                        planetDistanceFromSun
                    )
                );
            }

            systems.push(
                new System(
                    systemName,
                    new BABYLON.Vector3(systemX, systemY, systemZ),
                    planets
                )
            );
        }

        const galaxyName = `g${Date.now()}`;
        return new Galaxy(galaxyName, systems);
    }

    public static getRandomIntInclusive(min = 0, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRandomIntExclusive(min = 0, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
