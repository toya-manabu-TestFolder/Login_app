import Link from 'next/link';
import { userCookie } from '../page';
import { logout } from '../Home/page';
import styles from '../page.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav className={styles.nav}>
          <div>
            <Link href="http://localhost:3000">ログイン</Link>
          </div>
          <div>
            <Link href="http://localhost:3000/Home">
              ペット一覧へ
            </Link>
          </div>
          <div>
            <Link href="http://localhost:3000/create">
              登録ページ
            </Link>
          </div>
          <div>
            <p>{userCookie}がログイン中。</p>
          </div>
          <Link href="http://localhost:3000">
            <button onClick={logout}>ログアウト</button>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
