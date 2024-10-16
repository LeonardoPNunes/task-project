export const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ${className}`}
    >
      {children}
    </button>
  );
};
