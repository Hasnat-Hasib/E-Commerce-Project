import firebase, { auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCy31ngkeqlGceGGfixIscMIw4WgEagyvA",
    authDomain: "ecommerce-a2858.firebaseapp.com",
    databaseURL: "https://ecommerce-a2858.firebaseio.com",
    projectId: "ecommerce-a2858",
    storageBucket: "ecommerce-a2858.appspot.com",
    messagingSenderId: "1079878697506",
    appId: "1:1079878697506:web:d1c041e19f74abe8b9807b",
    measurementId: "G-QVYL2FJZS3"
  };


  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData

        });
      }catch (error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  export const aut = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account' });
  export const signInWithGoogle=()=> aut.signInWithPopup(provider);
  
  export default firebase;
