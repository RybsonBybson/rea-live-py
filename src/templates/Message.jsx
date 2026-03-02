export default function Message({ message = "", username = "", type = "" }) {
  return (
    <div className={type ? `mess ${type}` : "mess"}>
      {username !== "" ? `${username}: ` : ""}
      {message}
    </div>
  );
}
