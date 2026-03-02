export default function Message({ children, username = "", type = "" }) {
  return (
    <div className={type ? `mess ${type}` : "mess"}>
      {username !== "" ? `${username}` : ""}
      {children}
    </div>
  );
}
