/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { ChangeEvent, useState } from 'react';
import { Item } from '../pageType';

export default function create() {
  const items = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    deleted: false,
    options: [],
  };
  const [create, setcreate] = useState<Item>(items);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setcreate({
      ...create,
      [id]: value,
    });
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const pushData = () => {
    fetch('http://localhost:8000/items', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(create),
    });
  };

  return (
    <div>
      <form method="post">
        <label htmlFor="name">
          名前
          <input
            type="text"
            id="name"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          cols={30}
          rows={4}
          onChange={(e) => handleChange(e)}
        ></textarea>

        <br />
        <label htmlFor="price">
          ごはんの量
          <input
            type="text"
            id="price"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label htmlFor="imageUrl">
          ペット画像のURL
          <input
            type="text"
            id="imageUrl"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        {/* <label htmlFor="option">
          オプション追加
          <input
            type="text"
            id="option"
            onChange={(e) => pushOption(e)}
          />
        </label> */}
        <br />
        <button onClick={() => pushData()}>登録</button>
      </form>
    </div>
  );
}
