import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <h2>You are not logged in</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>

      <div>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>

        {user.image && (
          <img
            src={user.image}
            alt="avatar"
            style={{ width: 100, borderRadius: "50%" }}
          />
        )}
      </div>
    </div>
  );
}