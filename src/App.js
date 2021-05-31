import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
  const [user, setUser]= useState({});
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const gitProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn=()=>{
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });

  }
  const handleFacebookLogin =()=>{
        firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user',user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email,credential);
      });
  }

  const handleGithubLogin=()=>{
        firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log('git',user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });

  }



  return (
    <div className="App">
     <button onClick={handleGoogleSignIn}>Sign in google</button>
     <br/>
     <br/>
     <button onClick={handleFacebookLogin}>facebook login</button>
     <br/>
     <br/>
     <button onClick={handleGithubLogin}>github login</button>
     <h2>user name:{user.displayName}</h2>
     <h3>user email:{user.email}</h3>
     photo: <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
