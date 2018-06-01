import Generator from './Generator';
import firestore from '../src/firestore';

(async () => {
    firestore.settings({ timestampsInSnapshots: true });

    const galaxy = Generator.generateGalaxy();
    await firestore.collection('galaxies').add(galaxy.toJSON());
})();
