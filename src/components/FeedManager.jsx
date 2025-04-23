import React, { useState } from "react";

export default function FeedManager({ feeds, onAdd, onDelete }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !url) return;
    onAdd(name, url);
    setName("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input placeholder="Feed Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Feed URL" value={url} onChange={e => setUrl(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {feeds.map((feed, index) => (
          <li key={index}>
            <span>{feed.name}</span>
            <button onClick={() => onDelete(feed.url)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}