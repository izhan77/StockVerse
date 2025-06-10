const ButtonLoading = ({ isHovered }) => {
  return (
    <div className="button-loader flex gap-[0.25rem]">
      <div className={`w-[0.8rem] h-[0.8rem] rounded-full animate-[scaleUp_1s_infinite_ease-in-out_-0.32s] ${
        isHovered ? "bg-white" : "bg-black"
      }`}></div>
      <div className={`w-[0.8rem] h-[0.8rem] rounded-full animate-[scaleUp_1s_infinite_ease-in-out_-0.16s] ${
        isHovered ? "bg-white" : "bg-black"
      }`}></div>
      <div className={`w-[0.8rem] h-[0.8rem] rounded-full animate-[scaleUp_1s_infinite_ease-in-out] ${
        isHovered ? "bg-white" : "bg-black"
      }`}></div>
    </div>
  );
};

export default ButtonLoading;