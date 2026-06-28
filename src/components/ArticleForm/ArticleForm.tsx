import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  title: string;
  description: string;
  body: string;
  tagList: string;
};

const ArticleForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in");
      return;
    }

    const article = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList
        ? data.tagList.split(",").map((tag) => tag.trim())
        : [],
    };

    const res = await fetch(
      "https://realworld.habsida.net/api/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article }),
      }
    );

    const result = await res.json();
    console.log("CREATE ARTICLE RESPONSE:", result);

    if (!res.ok) {
      alert(
        result?.errors
          ? JSON.stringify(result.errors)
          : "Error creating article"
      );
      return;
    }

    navigate(`/articles/${result.article.slug}`);
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      <h2>Create new article</h2>

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

      <button type="submit">Publish</button>
    </form>
  );
};

export default ArticleForm;