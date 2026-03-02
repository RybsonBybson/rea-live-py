export default function Message({ children, username = "", type = "" }) {
  return (
    <div className={type ? `mess ${type}` : "mess"}>
      {username !== "" ? (type === "" ? `${username}: ` : username) : ""}
      {children}
    </div>
  );
}
