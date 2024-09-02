export const ErrMsg = ({ msg, className }) => {
  return (
    <p
      className={`text-danger mt-1 ${className}`}
      style={{ fontSize: "0.810rem" }}
    >
      {msg}
    </p>
  );
};
