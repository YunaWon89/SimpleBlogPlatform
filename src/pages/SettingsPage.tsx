import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type FormData = {
  username: string;
  email: string;
  password?: string;
  image?: string;
};

export default function SettingsPage() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      image: user?.image || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("UPDATED DATA:", data);

    // пока просто заглушка, чтобы не ломать build
    alert("Settings updated (UI only)");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>

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
          placeholder="New Password"
          type="password"
          {...register("password")}
        />

        <input
          placeholder="Avatar URL"
          {...register("image")}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}