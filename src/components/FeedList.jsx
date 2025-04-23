import React from "react";

export default function FeedList({ feeds, articles, selectedFeed, onSelectFeed }) {
  const countArticles = (feedName) =>
    articles.filter(a => a.feedTitle === feedName).length;

  return (
    <div>
      <h2>Feeds</h2>
      <ul>
        <li
          onClick={() => onSelectFeed(null)}
        >
          All Feeds ({articles.length})
        </li>
        {feeds.map((feed, index) => (
          <li
            key={index}
            onClick={() => onSelectFeed(feed.name)}
          >
            {feed.name} ({countArticles(feed.name)})
          </li>
        ))}
      </ul>
    </div>
  );
}