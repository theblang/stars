import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDYnV1zEarjpVSGjw7fj2CYTr6f0RUfQjA',
    authDomain: 'project-77761542301',
    projectId: 'stars-440b5'
});
const database = firebaseApp.firestore();

export default database;
