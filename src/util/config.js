import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB_QeMEZjbseKtwoF8jZw0tAZweQWSkEZ8",
  authDomain: "final-project-551cb.firebaseapp.com",
  projectId: "final-project-551cb",
  databaseURL: "https://final-project-551cb-default-rtdb.firebaseio.com/",
  storageBucket: "final-project-551cb.appspot.com",
  messagingSenderId: "1012210542533",
  appId: "1:1012210542533:web:b2c6634ae4906c36860dac",
};
const app = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(app);
export { firebaseDatabase };
