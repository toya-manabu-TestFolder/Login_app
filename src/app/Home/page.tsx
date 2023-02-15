'use client';
import Link from 'next/link';
import useSWR from 'swr';
import { Item } from '../pageType';
import styles from '../../style/Home.module.css';

export const logout = () => {
  return (document.cookie = 'user=; max-age=0');
};

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `http://localhost:8000/items`,
    fetcher
  );
  const itemList = data;
  if (!data) return <div>散歩中...</div>;

  const deleteItem = (id: number) => {
    fetch(`http://localhost:8000/items/${id}`, {
      method: 'DELETE',
    });
  };
  return (
    <form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>性格</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item: Item) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td className={styles.homeDescription}>
                    {item.description}
                  </td>
                  <td>
                    <Link href={`http://localhost:3000/${item.id}`}>
                      <p> 詳細編集ページへ</p>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteItem(item.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </form>
  );
}
