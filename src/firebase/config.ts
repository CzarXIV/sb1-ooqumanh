import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnwnuqW3KKuTPNrWzMM7Iz2Fw1lspegCA",
  authDomain: "smcollections-e170f.firebaseapp.com",
  projectId: "smcollections-e170f",
  storageBucket: "smcollections-e170f.firebasestorage.app",
  messagingSenderId: "641662107354",
  appId: "1:641662107354:web:1b5441bf1dd7cc1f9dafe3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Ensure required collections exist
const requiredCollections = ['posts', 'collections', 'appointments', 'emailOptIns'];

const ensureCollectionsExist = async () => {
  try {
    for (const collectionName of requiredCollections) {
      // Check if collection already has a placeholder document
      const q = query(collection(db, collectionName), where('_placeholder', '==', true));
      const snapshot = await getDocs(q);

      // Only create a placeholder if one doesn't exist
      if (snapshot.empty) {
        await addDoc(collection(db, collectionName), {
          _placeholder: true,
          _description: `Placeholder document for ${collectionName} collection`,
          createdAt: new Date().toISOString()
        });
        console.log(`Created placeholder for ${collectionName} collection`);
      }
    }
    console.log('Collections check completed');
  } catch (error) {
    console.error('Error ensuring collections exist:', error);
  }
};

// Run the check when the app initializes
ensureCollectionsExist();

export { app, db, storage, auth };