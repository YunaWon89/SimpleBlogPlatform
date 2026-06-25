
import { Link } from 'react-router-dom';
import type { Article } from '../types/Article';


interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="article-card">
      <div className="article-meta">
        <div className="author-info">
<Link to={`/profile/${article.author.username}`}>
  <img
    src="/Icon.png"
    alt="User"
    className="author-img"
  />
</Link>
          <div className="meta-text">
            <Link to={`/profile/${article.author.username}`} className="author-name">
              {article.author.username}
            </Link>
            <span className="article-date">{formattedDate}</span>
          </div>
        </div>
        <button className="favorite-btn" disabled style={{ opacity: 0.7, cursor: 'pointer' }}>
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
            <span key={i} className="tag-outline">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}