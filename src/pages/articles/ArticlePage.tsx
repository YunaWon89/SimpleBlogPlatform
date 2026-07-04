import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import Loader from "../../components/Loader";
import ErrorPage from "../../components/Error";
import type { Article } from "../../types/Article";
import defaultAvatar from "../../assets/Icon.png";
import { favoriteArticle, unfavoriteArticle } from "../../api/articles";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`
        );

        if (!res.ok) {
          throw new Error("Failed to load article");
        }

        const data = await res.json();
        setArticle(data.article);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAuthor = user?.username === article?.author?.username;

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    if (article) {
      setIsFavorited(article.favorited);
      setFavoritesCount(article.favoritesCount);
    }
  }, [article]);

  const handleFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token || !slug) return;

    try {
      if (isFavorited) {
        await unfavoriteArticle(slug, token);
        setIsFavorited(false);
        setFavoritesCount((c) => c - 1);
      } else {
        await favoriteArticle(slug, token);
        setIsFavorited(true);
        setFavoritesCount((c) => c + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this article?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );

    if (res.ok) {
      navigate("/");
    } else {
      alert("Delete failed");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;
  if (!article) return <ErrorPage message="Article not found" />;

  return (
    <div className="article-page">
      <div className="article-banner">
        <div className="container">
          <h1 style={{ color: "#fff", fontSize: "2.5rem" }}>
            {article.title}
          </h1>

          <div className="article-banner-meta">
            <img
              src={article.author.image || defaultAvatar}
              alt={article.author.username}
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div>
              <div style={{ color: "#fff" }}>{article.author.username}</div>

              <div style={{ color: "#ccc" }}>
                {new Date(article.createdAt).toDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "2rem" }}>
        <Markdown>{article.body}</Markdown>

        {article.tagList && article.tagList.length > 0 && (
          <div className="article-tags" style={{ marginTop: "1.5rem" }}>
            {article.tagList.map((tag) => (
              <span key={tag} className="tag-outline">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="article-footer">
          <div className="article-footer-author">
            <img
              src={article.author.image || defaultAvatar}
              alt={article.author.username}
              className="author-img"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />
            <div>
              <div className="author-name">{article.author.username}</div>
              <div className="article-date">
                {new Date(article.createdAt).toDateString()}
              </div>
            </div>

            {!isAuthor && (
              <button className="favorite-btn" onClick={handleFavorite}>
                {isFavorited ? "♥ Unfavorite" : "♡ Favorite article"} (
                {favoritesCount})
              </button>
            )}
          </div>

          {isAuthor && (
            <div className="article-actions">
              <button className="btn-edit" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}