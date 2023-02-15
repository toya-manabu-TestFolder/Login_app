/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import useSWR from 'swr';
import styles from '../../style/detail.module.css';

import { ChangeEvent, MouseEvent, useState } from 'react';

export async function generateStaticParams() {
  const req = await fetch('http://localhost:8000/items');
  const data = await req.json();
  return data.map((item: any) => ({
    id: item.id.toString(),
  }));
}

export default function page({ params }: { params: any }) {
  const [inputbooleanChange, setinputbooleanChange] =
    useState<boolean>(true);
  const [tablebooleanChange, settablebooleanChange] =
    useState<boolean>(true);
  const items = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    deleted: false,
    options: [],
  };
  const [update, setupdate] = useState(items);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `http://localhost:8000/items`,
    fetcher
  );
  let test = data;
  if (!data) return <div>loading...</div>;
  let page = test[Number(params.id) - 1];

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setupdate({
      ...update,
      [name]: value,
    });
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  // const updateData = (id: string) => {};

  const confirmation = (
    e: /* eslint-disable react-hooks/rules-of-hooks */
    MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    settablebooleanChange(tablebooleanChange ? false : true);
    setupdate({
      ...update,
    });
    fetch(`http://localhost:8000/items/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(update),
    }).then((res) => res.json());
  };

  const booleanChangeFun = () => {
    setinputbooleanChange(inputbooleanChange ? false : true);
    setupdate({
      id: page.id,
      name: page.name,
      description: page.description,
      price: page.price,
      imageUrl: page.imageUrl,
      deleted: false,
      options: [],
    });
  };

  const reset = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setinputbooleanChange(inputbooleanChange ? false : true);
    settablebooleanChange(tablebooleanChange ? false : true);
    setupdate(items);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>名前</th>
            <th className={styles.th}>性格</th>
            <th className={styles.th}>ごはんの量</th>
            <th className={styles.th}>写真のURL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>{page.id}</td>
            <td className={styles.td}>{page.name}</td>
            <td className={styles.td}>{page.description}</td>
            <td className={styles.td}>{page.price}</td>
            <td className={styles.td}>{page.imageUrl}</td>
          </tr>
          <tr
            className={tablebooleanChange ? styles.displayNone : ''}
          >
            <td className={styles.td}>{update.id}</td>
            <td className={styles.td}>{update.name}</td>
            <td className={styles.td}>{update.description}</td>
            <td className={styles.td}>{update.price}</td>
            <td className={styles.td}>{update.imageUrl}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => booleanChangeFun()}>
        内容を変更する。
      </button>

      <div className={inputbooleanChange ? styles.displayNone : ''}>
        <form method="PUT">
          <label htmlFor="name">
            名前
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={page.name}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br />
          <label htmlFor="description">
            説明
            <textarea
              id="description"
              name="description"
              cols={30}
              rows={4}
              defaultValue={page.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </label>
          <br />
          <label htmlFor="price">
            ごはんの量
            <input
              type="text"
              id="price"
              name="price"
              defaultValue={page.price}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br />
          <label htmlFor="imageUrl">
            商品画像のURL
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              defaultValue={page.imageUrl}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br />
          <button onClick={(e) => reset(e)}>元に戻す</button>
          <button
            type="submit"
            onClick={(e) => confirmation(e, params.id)}
          >
            確認
          </button>
          <button>再登録</button>
        </form>
      </div>
    </>
  );
}

export const dynamicParams = false;
