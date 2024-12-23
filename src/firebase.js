
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC9Iww5SJQ6hBJH7NhND2R0_V80DHjRBkM",
  authDomain: "netflix-clone-2cb9b.firebaseapp.com",
  projectId: "netflix-clone-2cb9b",
  storageBucket: "netflix-clone-2cb9b.firebasestorage.app",
  messagingSenderId: "659690745466",
  appId: "1:659690745466:web:6ca5eca69c0b5199a115c3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup= async( name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email, password);
       const user = res.user;
       await addDoc (collection(db, "user"),{
        uid:user.uid,
        name,
        authProvider :"local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }


}

const login = async(email, password)=>{
    try {
        
    await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout}