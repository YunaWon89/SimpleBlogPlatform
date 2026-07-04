import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createArticle } from "../../api/articles";

type ArticleForm = {
  title: string;
  description: string;
  body: string;
};

export default function NewArticlePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleForm>();

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onSubmit = async (formData: ArticleForm) => {
    if (!user) return;

    try {
      const data = await createArticle(user.token, {
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: tags,
      });

      reset();

      navigate(`/articles/${data.article.slug}`);
    } catch (error) {
      console.error(error);
      alert("Failed to publish article.");
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Article Title"
            {...register("title", {
              required: "Title is required.",
            })}
          />

          {errors.title && (
            <p className="form-error">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="What's this article about?"
            {...register("description", {
              required: "Description is required.",
            })}
          />

          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Write your article..."
            rows={8}
            {...register("body", {
              required: "Article text is required.",
            })}
          />

          {errors.body && (
            <p className="form-error">{errors.body.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="Enter tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />

          <div className="article-tags" style={{ marginTop: "12px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="tag-outline"
                onClick={() => removeTag(tag)}
                style={{ cursor: "pointer" }}
              >
                ✕ {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn-publish"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}