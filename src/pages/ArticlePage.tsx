import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown"; 
import Loader from "../components/Loader";
import Error from "../components/Error";
import type { Article } from "../types/Article";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
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

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!article) return <Error message="Article not found." />;

  return (
    <div className="article-page">
      <div className="banner" style={{ background: "#333", padding: "2rem 0" }}>
        <div className="container">
          <h1
            style={{
              color: "#fff",
              fontSize: "2.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {article.title}
          </h1>
          <div className="author-info">
            <img
              src={article.author.image}
              alt={article.author.username}
              className="author-img"
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
        </div>
      </div>
      <div
        className="container"
        style={{ marginTop: "2rem", paddingBottom: "5rem" }}
      >
        {}
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
