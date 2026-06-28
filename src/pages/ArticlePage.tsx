import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import Loader from "../components/Loader";
import ErrorPage from "../components/Error";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`
        );

        if (response.status === 429) {
          throw new Error("Too Many Requests. Please wait one minute.");
        }

        if (!response.ok) {
          throw new Error("Could not load this specific article details.");
        }

        const data = await response.json();
        setArticle(data.article);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchSingleArticle();
  }, [slug]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isAuthor =
    user && article?.author?.username === user.username;

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this article? This action cannot be undone."
    );

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
      alert("Failed to delete article");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;
  if (!article) return <ErrorPage message="Article not found." />;

  return (
    <div className="article-page">
      <div className="banner" style={{ background: "#333", padding: "2rem 0" }}>
        <div className="container">
          <h1 style={{ color: "#fff", fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            {article.title}
          </h1>

          <div className="author-info">
            <img
              src={article.author.image || defaultAvatar}
              alt={article.author.username}
              className="author-img"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div className="meta-text">
              <span className="author-name" style={{ color: "#fff" }}>
                {article.author.username}
              </span>

              <span className="article-date">
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>
          </div>

          {/* 🔥 EDIT / DELETE BUTTONS */}
          {isAuthor && (
            <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
              <button onClick={handleEdit}>Edit</button>

              <button
                onClick={handleDelete}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "2rem", paddingBottom: "5rem" }}
      >
        <div
          className="article-content"
          style={{ fontSize: "1.2rem", lineHeight: "1.8rem" }}
        >
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    </div>
  );
}