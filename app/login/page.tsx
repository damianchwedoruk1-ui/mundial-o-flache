'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function login() {
    setMessage('Logowanie...');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage('Błąd logowania: ' + error.message);
      return;
    }
    window.location.href = '/dashboard';
  }

  return (
    <main className="page">
      <section className="panel login-box">
        <p className="eyebrow">Liga Mundialowa</p>
        <h1>Logowanie</h1>
        <p className="muted">Na start konta tworzycie tylko dla 4 graczy.</p>
        <div className="form">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="hasło" type="password" />
          <button className="btn" onClick={login}>Zaloguj</button>
          {message && <p className="muted">{message}</p>}
        </div>
      </section>
    </main>
  );
}
