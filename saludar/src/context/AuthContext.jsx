import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../firebase/config"; // Nos conectamos con tu configuración

// 1. Creamos el contexto compartido
export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para registrar un nuevo usuario
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  
  const logout = () => {
    return signOut(auth);
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};