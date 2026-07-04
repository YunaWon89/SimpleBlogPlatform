import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../api/articles";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(article.favorited);
  const [favorites, setFavorites] = useState(article.favoritesCount);

  const handleLike = async () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    try {
      if (liked) {
        const updated = await unfavoriteArticle(user.token, article.slug);
        setLiked(updated.favorited);
        setFavorites(updated.favoritesCount);
      } else {
        const updated = await favoriteArticle(user.token, article.slug);
        setLiked(updated.favorited);
        setFavorites(updated.favoritesCount);
      }
    } catch (error) {
      console.error(error);
    }
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

            <span className="article-date">{date}</span>
          </div>
        </div>

        <button
          className={`favorite-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
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