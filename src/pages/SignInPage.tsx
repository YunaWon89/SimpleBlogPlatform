import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

 const onSubmit = async (data: FormData) => {
  console.log("CLICK LOGIN", data);

  try {
    await login(data.email, data.password);
    console.log("LOGIN SUCCESS");
    navigate("/");
  } catch (error) {
    console.log("LOGIN ERROR", error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}