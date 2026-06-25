
import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesPage from '../pages/ArticlesPage';
import ArticlePage from '../pages/ArticlePage';
import ErrorPage from "../components/Error";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/articles" element={<Navigate to="/" replace />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
     <Route path="*"element={<ErrorPage message="Page Not Found (404)" />} />
    </Routes>
  );
}