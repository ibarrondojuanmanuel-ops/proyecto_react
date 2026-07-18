import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Importaciones de la Clase 12
import { auth } from "../firebase/config"; // Nos conectamos con tu configuración

// 1. Creamos el contexto compartido
export const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(); // Inicializamos Firestore como pide la Clase 12

  // Función para registrar un nuevo usuario
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Función para cerrar sesión
  const logout = () => {
    return signOut(auth);
  };

  // Observador de autenticación con la lógica de roles de la Clase 12
  
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Validación directa por email (Asegura que entre sí o sí sin depender de Firestore)
        if (currentUser.email === 'profesor@test.com' || currentUser.email === 'administrador@correo.com') {
          setUser({ ...currentUser, rol: 'admin' });
        } else {
          // Si querés mantener la lectura de Firestore para otros usuarios de la clase:
          try {
            const userDocRef = doc(db, "usuarios", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists() && userDocSnap.data().rol === 'admin') {
              setUser({ ...currentUser, rol: 'admin' });
            } else {
              setUser({ ...currentUser, rol: 'user' });
            }
          } catch (error) {
            console.error("Error al leer Firestore:", error);
            setUser({ ...currentUser, rol: 'user' });
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

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