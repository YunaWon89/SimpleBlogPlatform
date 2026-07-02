import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { user } = useAuth();

  const storageKey = `liked-${article.slug}`;

  const [liked, setLiked] = useState(
    localStorage.getItem(storageKey) === "true"
  );

  const [favorites, setFavorites] = useState(article.favoritesCount);

  const handleLike = () => {
    if (!user) return;

    const newValue = !liked;

    setLiked(newValue);
    setFavorites((prev) =>
      newValue ? prev + 1 : Math.max(prev - 1, 0)
    );

    localStorage.setItem(storageKey, String(newValue));
  };

  const date = new Date(article.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="article-card">

      <div className="article-meta">

        <div className="article-author">
          <img
            src={article.author.image || defaultAvatar}
            alt={article.author.username}
            className="author-img"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          <div className="meta-text">
            <Link
              to={`/profile/${article.author.username}`}
              className="author-name"
            >
              {article.author.username}
            </Link>

            <span className="article-date">{date}</span>
          </div>
        </div>

        <button
          className={`favorite-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={!user}
        >
          ♥ {favorites}
        </button>
      </div>


      <Link
        to={`/articles/${article.slug}`}
        className="article-link"
      >
        <h2 className="article-title">{article.title}</h2>
        <p className="article-preview">{article.description}</p>
      </Link>

      <div className="article-tags">
        {article.tagList.map((tag) => (
          <span key={tag} className="tag-outline">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}