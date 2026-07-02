import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/Error";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";

export default function AuthorProfilePage() {
  const { username } = useParams();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://realworld.habsida.net/api/articles?author=${username}`
        );

        const data = await res.json();

        setArticles(data.articles);
      } catch (e) {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [username]);

  useEffect(() => {
    setIsFollowing(
      localStorage.getItem(`follow-${username}`) === "true"
    );
  }, [username]);

  const toggleFollow = () => {
    const newValue = !isFollowing;
    setIsFollowing(newValue);
    localStorage.setItem(`follow-${username}`, String(newValue));
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;

  const author = articles[0]?.author;

  return (
    <>
      <section className="profile-banner">
        <div className="container profile-banner-content">
          <img
            src={author?.image || defaultAvatar}
            className="profile-avatar"
            alt="avatar"
          />

          <h1>{author?.username}</h1>

  
          <button
            className="profile-follow-btn"
            onClick={toggleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </section>

      <main className="container profile-page">
        <div className="feed-toggle">
          <span className="feed-active">Articles</span>
        </div>

        {articles.length === 0 ? (
          <p className="empty-profile">
            No articles yet
          </p>
        ) : (
          <section className="articles-list">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}