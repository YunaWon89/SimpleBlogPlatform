import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.username, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
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

        <input
          placeholder="Email"
          {...register("email", { required: true })}
        />

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