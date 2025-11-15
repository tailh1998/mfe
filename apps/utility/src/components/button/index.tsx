const Button = ({ children, onClick }) => (
  <button
    style={{ padding: "8px 16px", background: "blue", color: "white" }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
