import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Header from "../components/Header";
import { fetchArticles } from "../api/Articles";
import type { Article } from "../types/Article";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  const articlesPerPage = 5;

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      const offset = (currentPage - 1) * articlesPerPage;

      try {
      
        const data = await fetchArticles(articlesPerPage, offset);
        setArticles(data.articles);
        setTotalArticles(data.articlesCount);
      } catch (err: any) {
        if (err.message && err.message.includes("429")) {
          setError("Too Many Requests. Please wait a minute before retrying.");
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [currentPage]); 

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <div>
      <Header /> {}
      <section className="banner">
        <div className="container text-center">
          <h1 className="banner-title" style={{textDecoration: 'underline'}}>Realworld Blog</h1>
          <p className="banner-subtitle">A place to share your knowledge.</p>
        </div>
      </section>
      <main className="container main-content">
        <section className="tags-box">
          <p className="tags-title">Popular tags</p>
          <div className="tags-list">
            <span className="tag-pill">one</span>
            <span className="tag-pill">something</span>
            <span className="tag-pill">chinese</span>
            <span className="tag-pill">english</span>
            <span className="tag-pill">french</span>
          </div>
        </section>

        {loading && <Loader />}
        {error && <Error message={error} />}

        {!loading && !error && (
          <>
            <section className="articles-list">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
