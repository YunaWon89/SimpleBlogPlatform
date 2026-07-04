import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateArticle } from "../../api/articles";

type ArticleForm = {
  title: string;
  description: string;
  body: string;
};

export default function EditArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleForm>();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`
        );

        const data = await response.json();

        setValue("title", data.article.title);
        setValue("description", data.article.description);
        setValue("body", data.article.body);

        setTags(data.article.tagList || []);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug, setValue]);

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
    if (!user || !slug) return;

    try {
      const data = await updateArticle(user.token, slug, {
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: tags,
      });

      navigate(`/articles/${data.article.slug}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update article.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="form-card">
      <h1 className="form-title">Edit Article</h1>

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
            rows={8}
            placeholder="Write your article..."
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

          <div
            className="article-tags"
            style={{ marginTop: "12px" }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="tag-outline"
                style={{ cursor: "pointer" }}
                onClick={() => removeTag(tag)}
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
            {isSubmitting ? "Updating..." : "Update Article"}
          </button>
        </div>
      </form>
    </div>
  );
}