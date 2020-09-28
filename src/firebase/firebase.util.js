import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyD4ytwINGQUOl9JCBS-kvvEopzT2T9fOZc",
    authDomain: "crwn-clothing-project-5298c.firebaseapp.com",
    databaseURL: "https://crwn-clothing-project-5298c.firebaseio.com",
    projectId: "crwn-clothing-project-5298c",
    storageBucket: "crwn-clothing-project-5298c.appspot.com",
    messagingSenderId: "1083351921992",
    appId: "1:1083351921992:web:e58a39871c33b6474baf7d"

}

export const createUserProfileDocument = async (userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName,email}=userAuth;
        const createdAt=new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log("erroe creating user",error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;





