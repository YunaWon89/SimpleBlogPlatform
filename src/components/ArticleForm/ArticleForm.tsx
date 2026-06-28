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
    const token = localStorage.getItem("token"); // если у тебя хранится токен так

    const article = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList
        ? data.tagList.split(",").map((tag) => tag.trim())
        : [],
    };

    const res = await fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({ article }),
    });

    const result = await res.json();

    if (res.ok) {
      navigate(`/articles/${result.article.slug}`);
    } else {
      console.log(result);
      alert("Error creating article");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new article</h2>

      <div>
        <label>Title</label>
        <input {...register("title", { required: "Title is required" })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <input {...register("description", { required: "Description is required" })} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Body</label>
        <textarea rows={8} {...register("body", { required: "Body is required" })} />
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