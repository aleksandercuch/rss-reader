import React, { useState, useEffect } from "react";
import FeedManager from "./components/FeedManager";
import ArticleList from "./components/ArticleList";
import ArticleView from "./components/ArticleView";
import SearchBar from "./components/SearchBar";
export default function App() {
  const [feeds, setFeeds] = useState(() => {
    const storedFeeds = JSON.parse(localStorage.getItem("feeds"));
    return storedFeeds?.length > 0 ? storedFeeds : [];
  });

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedFeedUrl, setSelectedFeedUrl] = useState("all");

  

  const handleAddFeed = (name, url) => {
    setFeeds(prev => [...prev, { name, url }]);
  };

  const handleDeleteFeed = (url) => {
    setFeeds(prev => {
      const updatedFeeds = prev.filter(f => f.url !== url);
      localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
      return updatedFeeds;
    });
  };

  const filteredArticles = articles.filter(article => {
    const matchesFeed = selectedFeedUrl === "all" || article.feedUrl === selectedFeedUrl;
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    return matchesFeed && matchesSearch;
  });

  useEffect(() => {
    // Defined fetchArticles here because I use it only here in useEffect hook
    const fetchArticles = async () => {
      const allArticles = [];
  
      for (const feed of feeds) {
        try {
          const proxyUrl = "https://cors-anywhere.herokuapp.com/";
          const res = await fetch(proxyUrl + feed.url);
          const xml = await res.text();
          const doc = new DOMParser().parseFromString(xml, "application/xml");
  
          const items = Array.from(doc.querySelectorAll("item")).map(item => ({
            title: item.querySelector("title")?.textContent || "No title",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            content: item.querySelector("description")?.textContent || "",
            feedTitle: doc.querySelector("channel > title")?.textContent || feed.name,
            feedUrl: feed.url,
          }));
  
          allArticles.push(...items);
        } catch (e) {
          console.error("Failed to fetch or parse feed:", feed.url, e);
        }
      }
  
      allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setArticles(allArticles);
    };
  
    localStorage.setItem("feeds", JSON.stringify(feeds));
    fetchArticles();
  }, [feeds]);

  return (
    <div>
      <div>
        <div>
          <h1>
            RSS Reader
          </h1>

          {!selectedArticle ? (
            <>
              <FeedManager feeds={feeds} onAdd={handleAddFeed} onDelete={handleDeleteFeed} />
              <SearchBar value={search} onChange={setSearch} />

              <div>
                <label>Filtruj po źródle:</label>
                <select
                  value={selectedFeedUrl}
                  onChange={(e) => setSelectedFeedUrl(e.target.value)}
                >
                  <option value="all">Wszystkie</option>
                  {feeds.map((feed, index) => (
                    <option key={index} value={feed.url}>
                      {feed.name}
                    </option>
                  ))}
                </select>
              </div>

              <ArticleList articles={filteredArticles} onSelect={setSelectedArticle} />
            </>
          ) : (
            <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
          )}
        </div>
      </div>
    </div>
  );
}