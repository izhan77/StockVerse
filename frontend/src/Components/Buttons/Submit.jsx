import { Check } from "lucide-react";
import ButtonLoading from "../Animations/ButtonLoading";

const Submit = ({ name, isSubmitting = false, isSuccess = false }) => {
  return (
    <div
      className={`relative border border-gray-500 text-lg px-6 py-2 overflow-hidden text-center rounded-full cursor-pointer flex flex-row justify-center items-center gap-x-3 font-semibold tracking-tight transition-all duration-300 ease-in-out after:content-[''] after:absolute after:w-full after:h-full after:transition-all
      after:duration-300
      after:ease-in-out after:left-0 after:bottom-[-100%] after:rounded-full hover:after:bottom-0 hover:after:rounded-none ${
        isSuccess
          ? "bg-green-600 text-white after:bg-green-700"
          : isSubmitting
          ? "bg-gray-600 text-white after:bg-gray-700"
          : "text-gray-700 hover:text-white after:bg-black"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {!isSubmitting && !isSuccess && name}
        {isSubmitting && (
          <>
            Submitting
            <ButtonLoading isHovered={true} />
          </>
        )}
        {isSuccess && (
          <>
            Submitted Successfully
            <Check size={24} strokeWidth={4} />
          </>
        )}
      </span>
    </div>
  );
};

export default Submit;