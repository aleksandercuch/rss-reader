import React from "react";

export default function ArticleView({ article, onBack }) {
  return (
    <div>
      <button onClick={onBack}>← Back to list</button>
      <h2>{article.title}</h2>
      <p>{new Date(article.pubDate).toLocaleString()}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content || article.contentSnippet }}></div>
      <a href={article.link} target="_blank" rel="noreferrer">Read full article</a>
    </div>
  );
}