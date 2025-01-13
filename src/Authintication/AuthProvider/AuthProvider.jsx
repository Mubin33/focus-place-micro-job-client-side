import { createContext, useEffect, useState } from "react"; 
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";  
import auth from './../../Firebase/Firebase';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  let [user, setUser] = useState([]);
  let [loading, setLoading] = useState(true); 

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

//   
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

//   
  const logoutUser = () => {
    return signOut(auth);
  };

//   
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let obj = {
    name: "bd",
    registerUser,
    loginUser,
    loading,
    user,
    logoutUser,
    updateUser,
    googleLogin, 
  };
  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
