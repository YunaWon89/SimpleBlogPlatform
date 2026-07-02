import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/Error";
import defaultAvatar from "../assets/Icon.png";
import type { Article } from "../types/Article";

export default function ProfilePage() {
  const { user } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadArticles = async () => {
      try {
        const res = await fetch(
          `https://realworld.habsida.net/api/articles?author=${user.username}`
        );

        if (!res.ok) {
          throw new Error("Failed to load articles");
        }

        const data = await res.json();

        setArticles(data.articles);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [user]);

  if (!user) return null;

  if (loading) return <Loader />;

  if (error) return <ErrorPage message={error} />;

  return (
    <>
      <section className="profile-banner">
        <div className="container profile-banner-content">
          <img
            src={user.image || defaultAvatar}
            alt={user.username}
            className="profile-avatar"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          <h1>{user.username}</h1>
        </div>
      </section>

      <main className="container profile-page">
        <div className="feed-toggle">
          <span className="feed-active">Your Feed</span>
        </div>

        {articles.length === 0 ? (
          <p className="empty-profile">
            You haven't published any articles yet.
          </p>
        ) : (
          <section className="articles-list">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}