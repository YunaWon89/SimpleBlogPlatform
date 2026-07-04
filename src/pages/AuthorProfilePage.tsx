import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/Error";
import { followUser, unfollowUser } from "../api/auth";
import type { Article } from "../types/Article";
import defaultAvatar from "../assets/Icon.png";
import { useAuth } from "../context/AuthContext";

type Profile = {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
};

export default function AuthorProfilePage() {
  const { username } = useParams<{ username: string }>();
const { user } = useAuth();
const isOwnProfile = user?.username === username;
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const [articlesRes, profileRes] = await Promise.all([
          fetch(
            `https://realworld.habsida.net/api/articles?author=${username}`
          ),
          fetch(`https://realworld.habsida.net/api/profiles/${username}`, {
            headers: token ? { Authorization: `Token ${token}` } : {},
          }),
        ]);

        if (!articlesRes.ok || !profileRes.ok) {
          throw new Error("Failed to load profile");
        }

        const articlesData = await articlesRes.json();
        const profileData = await profileRes.json();

        setArticles(articlesData.articles);
        setProfile(profileData.profile);
        setIsFollowing(profileData.profile.following);
      } catch (e) {
        console.error(e);
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [username]);

  const toggleFollow = async () => {
    const token = localStorage.getItem("token");
    if (!token || !username || followLoading) return;

    setFollowLoading(true);

    try {
      if (isFollowing) {
        await unfollowUser(username, token);
        setIsFollowing(false);
      } else {
        await followUser(username, token);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Follow error:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;
  if (!profile) return <ErrorPage message="Author not found" />;

  return (
    <>
      <section className="profile-banner">
        <div className="container profile-banner-content">
          <img
            src={profile.image || defaultAvatar}
            className="profile-avatar"
            alt={profile.username}
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          <h1>{profile.username}</h1>

          {!isOwnProfile && (
  <button
    className="profile-follow-btn"
    onClick={toggleFollow}
    disabled={followLoading}
  >
    {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
  </button>
)}
        </div>
      </section>

      <main className="container profile-page">
        <div className="feed-toggle">
          <span className="feed-active">Articles</span>
        </div>

        {articles.length === 0 ? (
          <p className="empty-profile">No articles yet</p>
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