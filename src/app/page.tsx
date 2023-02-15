'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import useSWR from 'swr';
import styles from './page.module.css';

export let userCookie = document.cookie.slice(14);
export let Cookie = document.cookie;

export default function Home() {
  const [username, setusername] = useState('');
  const [display, setdisplay] = useState(true);
  const [actionBoolean, setactionBoolean] = useState(true);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    'http://localhost:8000/items',
    fetcher
  );
  if (!data) return <div>...散歩中</div>;
  const user = data.map((e: any) => {
    return e.name;
  });

  const checkLogin = (e: FormEvent<HTMLFormElement>) => {
    if (user.some((e: string) => e === username)) {
      document.cookie = `user=${username};max-age=3600`;
      setactionBoolean(false);
    } else {
      e.preventDefault();
      setdisplay(false);
    }
  };

  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let user = e.target.value;
    setusername(user);
  };
  console.log(document.cookie);
  return (
    <form
      action={actionBoolean ? '' : 'http://localhost:3000/Home'}
      onSubmit={(e) => checkLogin(e)}
    >
      <div>
        <div>
          <input type="text" onChange={(e) => handleChange(e)} />
        </div>
        <p className={display ? styles.displaynone : styles.caveat}>
          ログイン情報が間違っています。
        </p>
        <button type="submit">ログイン</button>
      </div>
    </form>
  );
}
