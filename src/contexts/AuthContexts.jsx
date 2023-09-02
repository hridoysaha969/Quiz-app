import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../firebase";
import AuthContext from "../hooks/authContextHook";

AuthProvider.propTypes = {
  children: PropTypes.any,
  onClickOut: PropTypes.func,
};
// const AuthContext = React.createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

export function AuthProvider({ children }) {
  const [loading, setLoding] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoding(false);
    });

    // Cleanup
    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
