import React from "react";

export default function ArticleList({ articles, onSelect }) {
  return (
    <ul>
      {articles.map((article, index) => (
        <li key={index} onClick={() => onSelect(article)}>
          <h2>{article.title}</h2>
          <p>{article.feedTitle} | {new Date(article.pubDate).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
}