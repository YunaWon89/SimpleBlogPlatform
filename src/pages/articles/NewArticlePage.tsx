import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ArticleForm = {
  title: string;
  description: string;
  body: string;
};

const AVAILABLE_TAGS = [
  "Universal",
  "pets",
  "Chinese",
  "Korean",
  "Russian",
  "Dog Breed",
];

export default function NewArticlePage() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleForm>();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const onSubmit = async (data: ArticleForm) => {
    const payload = {
      ...data,
      tagList: selectedTags,
    };

    console.log(payload);
    alert("Article published (UI only)");
    navigate("/");
  };

  return (
    <div className="form-card">
      <h1 className="form-title">New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TITLE */}
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="form-error">{errors.title.message}</p>
          )}
        </div>


        <div className="form-group">
          <input
            className="form-input"
            placeholder="Short description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>


        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Input your text"
            {...register("body", { required: "Text is required" })}
          />
          {errors.body && (
            <p className="form-error">{errors.body.message}</p>
          )}
        </div>


        <div className="form-group">
          <p style={{ marginBottom: 8, fontSize: 14, color: "#666" }}>
          
          </p>

          <div className="tags-select">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag-btn ${
                  selectedTags.includes(tag) ? "active" : ""
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

  
        <div className="newpost-footer">
          <div />

          <button
            type="submit"
            className="btn-publish"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}