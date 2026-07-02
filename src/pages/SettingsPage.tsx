import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type SettingsForm = {
  username: string;
  email: string;
  bio: string;
  image: string;
  password: string;
};

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsForm>({
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      bio: "",
      image: user?.image ?? "",
      password: "",
    },
  });

  const onSubmit = async (data: SettingsForm) => {
    if (!user) return;

    console.log(data);
    alert("Settings updated (UI only)");
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Your Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Username"
            {...register("username", {
              required: "Username is required.",
            })}
          />
          {errors.username && (
            <p className="form-error">{errors.username.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email.",
              },
            })}
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Input your bio"
            {...register("bio")}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="Avatar image (URL)"
            {...register("image", {
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Invalid URL.",
              },
            })}
          />
          {errors.image && (
            <p className="form-error">{errors.image.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Minimum 6 characters.",
              },
              maxLength: {
                value: 40,
                message: "Maximum 40 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn-update"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Settings"}
          </button>
        </div>
      </form>

  
      <div className="logout-wrapper">
        <button type="button" onClick={handleLogout}>
          Or click here to logout
        </button>
      </div>
    </div>
  );
}