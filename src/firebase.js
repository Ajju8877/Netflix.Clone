import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-eCaqkhcZIio7XYxEi0KHpra9X_y4G3M",
  authDomain: "netflix-clone-7f3b6.firebaseapp.com",
  projectId: "netflix-clone-7f3b6",
  storageBucket: "netflix-clone-7f3b6.appspot.com",
  messagingSenderId: "560770920186",
  appId: "1:560770920186:web:0d2d636be7bd2dcd846343",
  measurementId: "G-TVPF4HQ7RE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { provider, auth, storage };
export default db;
