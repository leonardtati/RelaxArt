import React, { createContext, useEffect, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDmXc-hDBgKfSkBaoNzSMYGe7ApMgLIUJE",
  authDomain: "relax-art.firebaseapp.com",
  databaseURL: "https://relax-art.firebaseio.com",
  projectId: "relax-art",
  storageBucket: "relax-art.appspot.com",
  messagingSenderId: "1024781295980",
  appId: "1:1024781295980:web:ae940c7e6ae76a1cd4d349",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
providers.googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInContext = createContext(null);

const SignInProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [mongoUser, setMongoUser] = useState({});

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    console.log("STRING");
    if (user) {
      console.log("USERÉ", user);
      const obj = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((googleUser) => {
          console.log("JSON", googleUser);
          setAppUser(googleUser.data);
        });
      fetch("/mongoUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((mongoUser) => {
          console.log("BEFORESET", mongoUser);
          setMongoUser(mongoUser.data);
        });
    }
  }, [user]);

  console.log("APPUSER", appUser);
  console.log("MONGO", mongoUser.data);

  return (
    <signInContext.Provider
      value={{ signInWithGoogle, handleSignOut, appUser, user }}
    >
      {children}
    </signInContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  firebaseApp,
})(SignInProvider);
