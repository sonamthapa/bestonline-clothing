import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAVu749B3nak07WnEvgJ0TmmwamRACB1ZQ",
    authDomain: "bestonline-clothing.firebaseapp.com",
    databaseURL: "https://bestonline-clothing.firebaseio.com",
    projectId: "bestonline-clothing",
    storageBucket: "bestonline-clothing.appspot.com",
    messagingSenderId: "890482064868",
    appId: "1:890482064868:web:6f74f266a490f8b61cdbf1",
    measurementId: "G-77HGSJP59S"
  };
  export const  createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();
    console.log(snapShot)

    if(!snapShot.exists) {
      //create piece of data using userAuth object if no data
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        //.set is create method
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.mesage);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;





