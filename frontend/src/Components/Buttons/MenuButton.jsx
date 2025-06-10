
const MenuButton = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`border border-gray-500 px-3 py-1 md:px-6 md:py-2 gap-x-5 rounded-full cursor-pointer font-bold text-lg custom-700:text-2xl tracking-tight text-gray-700 flex justify-center items-center`}
    >
      <div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300"
        >
          <line
            x1="3"
            y1={isOpen ? "12" : "9"}
            x2="21"
            y2={isOpen ? "12" : "9"}
            className={`transition-all duration-300 ${
              isOpen ? "rotate-45 origin-center" : ""
            }`}
          />
          <line
            x1="3"
            y1={isOpen ? "12" : "15"}
            x2="21"
            y2={isOpen ? "12" : "15"}
            className={`transition-all duration-300 ${
              isOpen ? "-rotate-45 origin-center" : ""
            }`}
          />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold">Menu</h4>
      </div>
    </button>
  );
};

export default MenuButton;
