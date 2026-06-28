interface ErrorProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <div
      className="text-center"
      style={{ padding: "2rem", color: "#b85c5c", fontWeight: "500" }}
    >
      {message}
    </div>
  );
}
