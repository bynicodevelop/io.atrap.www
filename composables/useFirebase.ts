import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const useFirebase = () => {
    console.log("Initializing Firebase");
    
    const {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, SITE_URL} = useRuntimeConfig();
    
    const firebaseApp = initializeApp({
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
      });

    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    
    if(window.location.hostname === 'localhost') {
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }

    return {
        auth,
        firestore,
    }
  }