import { Routes, Route } from "react-router-dom";
import ArticlesPage from "../pages/articles/ArticlesPage";
import ArticlePage from "../pages/articles/ArticlePage";
import SignInPage from "../pages/login/SignInPage";
import SignUpPage from "../pages/registration/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ErrorPage from "../components/Error";
import NewArticlePage from "../pages/articles/NewArticlePage";
import EditArticlePage from "../pages/articles/EditArticlePage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/new-article"
        element={
          <ProtectedRoute>
            <NewArticlePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles/:slug/edit"
        element={
          <ProtectedRoute>
            <EditArticlePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ErrorPage message="Page Not Found (404)" />} />
    </Routes>
  );
}
