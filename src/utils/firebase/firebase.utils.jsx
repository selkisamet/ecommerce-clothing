import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
initializeApp(firebaseConfig);

// Google Auth Provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore
const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshoot = await getDoc(userDocRef);

    if (!userSnapshoot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }

        return userDocRef;
    }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}