import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

type SignInForm = {
  email: string;
  password: string;
};

type ApiError = {
  errors?: Record<string, string[]>;
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>();

  const onSubmit = async (formData: SignInForm) => {
    try {
      const data = await loginUser(formData.email, formData.password);

      setUser(data.user);
      navigate("/");
    } catch (err: unknown) {
      const apiError = err as ApiError;

      if (apiError.errors?.email) {
        setError("email", {
          type: "server",
          message: apiError.errors.email.join(", "),
        });
      }

      if (apiError.errors?.password) {
        setError("password", {
          type: "server",
          message: apiError.errors.password.join(", "),
        });
      }

      if (!apiError.errors) {
        setError("email", {
          type: "server",
          message: "Email or password is invalid.",
        });
      }
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Sign In</h1>

      <p className="form-subtitle">
        <Link to="/sign-up">Need an account?</Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address.",
              },
            })}
          />

          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required.",
            })}
          />

          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}