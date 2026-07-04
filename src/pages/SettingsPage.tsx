import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/auth";

type SettingsForm = {
  username: string;
  email: string;
  bio: string;
  image: string;
  password: string;
};

export default function SettingsPage() {
  const { user, setUser, logout } = useAuth();
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

  const onSubmit = async (formData: SettingsForm) => {
    if (!user) return;

    try {
   const data = await updateUser(user.token, {
  username: formData.username,
  email: formData.email,
  bio: formData.bio,
  image: formData.image,
  password: formData.password || undefined,
});

setUser(data.user);

navigate("/profile");

      setUser(data.user);


      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    }
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
            placeholder="Short bio about you"
            {...register("bio")}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="URL of profile picture"
            {...register("image")}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="New Password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Minimum 6 characters.",
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

      <hr style={{ margin: "30px 0" }} />

      <div className="logout-wrapper">
        <button
          type="button"
          className="btn-logout"
          onClick={handleLogout}
        >
          Or click here to logout
        </button>
      </div>
    </div>
  );
}