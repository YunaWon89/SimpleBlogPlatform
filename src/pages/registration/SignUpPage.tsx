import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      alert("Account created!");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      alert("Sign up failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Username"
          {...register("username", { required: true })}
        />

        <input placeholder="Email" {...register("email", { required: true })} />

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />

        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
