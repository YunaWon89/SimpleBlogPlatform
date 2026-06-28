import { Routes, Route } from "react-router-dom";
import ArticlesPage from "../pages/ArticlesPage";
import ArticlePage from "../pages/ArticlePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ErrorPage from "../components/Error";
import NewArticlePage from "../pages/NewArticlePage";
import EditArticlePage from "../pages/EditArticlePage";
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
