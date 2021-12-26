import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBk5nbxgV01w5803cgCczDO5UJzx-JtTIY",
    authDomain: "ecommerce-app-db-81573.firebaseapp.com",
    projectId: "ecommerce-app-db-81573",
    storageBucket: "ecommerce-app-db-81573.appspot.com",
    messagingSenderId: "752803162809",
    appId: "1:752803162809:web:b7bc25c441730cbc400968",
    measurementId: "G-0MRZBCD89M"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;