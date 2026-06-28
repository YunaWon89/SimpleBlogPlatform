import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type FormValues = {
  title: string;
  description: string;
  body: string;
  tagList: string;
};

export default function EditArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // 1. Загружаем статью
  useEffect(() => {
    const loadArticle = async () => {
      const res = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`
      );

      const data = await res.json();
      const article = data.article;

      // 2. заполняем форму
      setValue("title", article.title);
      setValue("description", article.description);
      setValue("body", article.body);
      setValue(
        "tagList",
        article.tagList ? article.tagList.join(", ") : ""
      );

      setLoading(false);
    };

    if (slug) loadArticle();
  }, [slug, setValue]);

  // 3. отправка обновления
  const onSubmit = async (data: FormValues) => {
    const token = localStorage.getItem("token");

    const article = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList
        ? data.tagList.split(",").map((t) => t.trim())
        : [],
      slug,
    };

    const res = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify({ article }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      navigate(`/articles/${result.article.slug}`);
    } else {
      alert("Error updating article");
      console.log(result);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit article</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title", { required: "Title is required" })} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Body</label>
          <textarea
            rows={8}
            {...register("body", { required: "Body is required" })}
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>

        <div>
          <label>Tags (comma separated)</label>
          <input {...register("tagList")} />
        </div>

        <button type="submit">Update article</button>
      </form>
    </div>
  );
}