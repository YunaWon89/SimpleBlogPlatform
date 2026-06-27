import { Link } from "react-router-dom";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
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
        <button
          className="favorite-btn"
          disabled
          style={{ opacity: 0.7, cursor: "pointer" }}
        >
          <span className="heart-icon">♥</span> {article.favoritesCount}
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
