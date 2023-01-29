import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2KzK1EYOXLralYW4ZPp4bwHCkSARTAEA",
    authDomain: "ecommerce-clothing-729db.firebaseapp.com",
    projectId: "ecommerce-clothing-729db",
    storageBucket: "ecommerce-clothing-729db.appspot.com",
    messagingSenderId: "811571065158",
    appId: "1:811571065158:web:19ed1897cd879d5d5fb547"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Auth Provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore
const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshoot = await getDoc(userDocRef);
    console.log(userSnapshoot);
    console.log(userSnapshoot.exists());

    if (!userSnapshoot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }

        return userDocRef;
    }
}