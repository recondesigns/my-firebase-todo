import React from 'react'
import './App.css';
import firebase from 'firebase'
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Button from './components/Button';
import Chatroom from './components/Chatroom';

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider()

  auth.signInWithPopup(provider)
}

function signOut() {
  auth.signOut()
}

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <Button onclick={signOut}>Sign out</Button>
      </header>
      <section>
        {user ? <Chatroom /> : <Button onclick={signIn}>Sign in</Button>}
      </section>
    </div>
  );
}

export default App;
