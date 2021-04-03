import firebase from "firebase/app";
import { oauthLogin } from "./firebase";

export const auth = firebase.auth();

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return oauthLogin(googleProvider);
};

export const signInWithApple = () => {
  const appleProvider = new firebase.auth.GoogleAuthProvider();
  return oauthLogin(appleProvider);
};

export const signInWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return oauthLogin(githubProvider);
};

// Step 1.
// User tries to sign in to Facebook.
export const signInWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  facebookProvider.addScope("public_profile,email");
  return oauthLogin(facebookProvider);
};

export default auth;
