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

// query Reference 
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // CRUD requires document reference object
    if (!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();  

        // if there is no user, create one
        try{
            await userRef.set(
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                }
            )
        }
        catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // collection rough object
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        // new doc in firebase
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };
  
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;