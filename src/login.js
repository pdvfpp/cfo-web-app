import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState(auth.currentUser);
  const [email]    = useState('cfo100@gmail.com'); // your dummy email
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return unsub;
  }, []);

  const handleSignIn = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return user
    ? <button onClick={handleSignOut} style={{ marginBottom: '20px' }}>
        Sign out
      </button>
    : (
      <form onSubmit={handleSignIn} style={{ marginBottom: '20px' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign in</button>
      </form>
    );
}