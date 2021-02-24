import Rebase from 're-base';
import firebase from 'firebase';

// Firebase App
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL:
    'https://catch-of-the-day-spaceinvadev-default-rtdb.firebaseio.com',
});

// Rebase binding
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
