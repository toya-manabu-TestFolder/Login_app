'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/router';

export let userCookie = document.cookie.slice(14);
export let Cookie = document.cookie;

export default function Home() {
  const router = useRouter();
  const [username, setusername] = useState('');
  const [display, setdisplay] = useState(false);
  const [actionBoolean, setactionBoolean] = useState(false);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const checkLogin = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(username),
    }).then((res) => {
      return res.status;
    });
  };

  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let user = e.target.value;
    setusername(user);
  };

  return (
    <form
      // action="http://localhost:3000/Home"
      method="POST"
      onSubmit={checkLogin}
    >
      <div>
        <div>
          <input type="text" onChange={(e) => handleChange(e)} />
        </div>
        <p className={display ? styles.caveat : styles.displaynone}>
          ログイン情報が間違っています。
        </p>
        <button type="submit">ログイン</button>
      </div>
    </form>
  );
}
