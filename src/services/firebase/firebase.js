import dotenv from "dotenv";
// This import loads the firebase namespace along with all its type information.
import firebase from "firebase/app";
import { toast } from "react-toastify";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/firestore";
dotenv.config();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  });
} else {
  // firebase.app(); // if already initialized, use that one
}

function getProvider(providerId) {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return new firebase.auth.GoogleAuthProvider();
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return new firebase.auth.FacebookAuthProvider();
    case firebase.auth.GithubAuthProvider.PROVIDER_ID:
      return new firebase.auth.GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

const supportedPopupSignInMethods = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
];

export async function oauthLogin(provider) {
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (err) {
    if (
      err.email &&
      err.credential &&
      err.code === "auth/account-exists-with-different-credential"
    ) {
      const providers = await firebase
        .auth()
        .fetchSignInMethodsForEmail(err.email);
      const firstPopupProviderMethod = providers.find((p) =>
        supportedPopupSignInMethods.includes(p)
      );

      // Test: Could this happen with email link then trying social provider?
      if (!firstPopupProviderMethod) {
        throw new Error(
          `Your account is linked to a provider that isn't supported.`
        );
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: err.email });

      const result = await firebase.auth().signInWithPopup(linkedProvider);
      result.user.linkWithCredential(err.credential);
    }

    toast(err.message || err.toString());
  }
}
