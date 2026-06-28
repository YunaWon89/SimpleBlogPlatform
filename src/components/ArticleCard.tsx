import { useState } from "react";
import { Link } from "react-router-dom";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const storageKey = `liked-${article.slug}`;

  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(storageKey) === "true";
  });
  const [count, setCount] = useState(article.favoritesCount);

  const toggleFavorite = () => {
    const newLiked = !liked;

    const newCount = newLiked ? count + 1 : Math.max(count - 1, 0);

    setLiked(newLiked);
    setCount(newCount);

    localStorage.setItem(storageKey, String(newLiked));
  };

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <article className="article-card">
      <div className="article-meta">
        <div className="author-info">
          <Link to={`/profile/${article.author.username}`}>
            <img
              src={article.author.image || defaultAvatar}
              alt={article.author.username}
              className="author-img"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />
          </Link>

          <div className="meta-text">
            <Link
              to={`/profile/${article.author.username}`}
              className="author-name"
            >
              {article.author.username}
            </Link>
            <span className="article-date">{formattedDate}</span>
          </div>
        </div>

        <button className="favorite-btn" onClick={toggleFavorite}>
          <span style={{ color: liked ? "green" : "gray" }}>♥</span> {count}
        </button>
      </div>

      <Link to={`/articles/${article.slug}`} className="article-link">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-preview">{article.description}</p>
      </Link>

      <div className="card-footer">
        <div className="article-tags">
          {article.tagList.map((tag, i) => (
            <span key={i} className="tag-outline">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
