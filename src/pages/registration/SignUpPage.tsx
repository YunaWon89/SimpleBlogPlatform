import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { registerUser } from "../../api/auth";

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agree: boolean;
};

type ApiError = {
  errors?: Record<string, string[]>;
};

export default function SignUpPage() {
  const navigate = useNavigate();

 const {
  register,
  handleSubmit,
  control,
  setError,
  formState: { errors, isSubmitting },
} = useForm<SignUpForm>();

const password = useWatch({
  control,
  name: "password",
});

  const onSubmit = async (formData: SignUpForm) => {
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/sign-in");
    } catch (err: unknown) {
      const apiError = err as ApiError;

      if (apiError.errors?.username) {
        setError("username", {
          type: "server",
          message: apiError.errors.username.join(", "),
        });
      }

      if (apiError.errors?.email) {
        setError("email", {
          type: "server",
          message: apiError.errors.email.join(", "),
        });
      }

      if (!apiError.errors) {
        setError("email", {
          type: "server",
          message: "Registration failed.",
        });
      }
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Sign Up</h1>

      <p className="form-subtitle">
        <Link to="/sign-in">Have an account?</Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Username"
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "Username must be no more than 20 characters.",
              },
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              maxLength: {
                value: 40,
                message: "Password must be no more than 40 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              required: "Please repeat your password.",
              validate: (value) =>
                value === password || "Passwords do not match.",
            })}
          />
          {errors.repeatPassword && (
            <p className="form-error">{errors.repeatPassword.message}</p>
          )}
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              {...register("agree", {
                required: "You must agree before continuing.",
              })}
            />{" "}
            I agree to the processing of my personal information
          </label>

          {errors.agree && (
            <p className="form-error">{errors.agree.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}