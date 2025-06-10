import { useLocation } from "react-router-dom";
import employee from "../../assets/employee.jpg";
import manager from "../../assets/manager.jpg";
import auditor from "../../assets/auditor.jpg";
import taxInspector from "../../assets/tax-inspector.jpg";
import defaultpic from "../../assets/default.jpg";

const PictureLoader = () => {
  const { state } = useLocation();
  const role = state?.role;

  return (
    <div className="flex items-center justify-center">
      {role === "employee" ? (
        <img
          className="h-[42em] rounded-3xl w-auto mr-6 sm:mr-0 md:mr-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] 
             dark:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)]
             transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)]
             hover:translate-x-[-5px] hover:translate-y-[-5px]"
          src={employee}
          alt="Employee Picture"
        />
      ) : role === "manager" ? (
        <img
          className="h-[42em] rounded-3xl w-auto mr-6 sm:mr-0 md:mr-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] 
             dark:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)]
             transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)]
             hover:translate-x-[-5px] hover:translate-y-[-5px]"
          src={manager}
          alt="Manager Picture"
        />
      ) : role === "auditor" ? (
        <img
          className="h-[42em] rounded-3xl w-auto mr-6 sm:mr-0 md:mr-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] 
             dark:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)]
             transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)]
             hover:translate-x-[-5px] hover:translate-y-[-5px]"
          src={auditor}
          alt="Auditor Picture"
        />
      ) : role === "tax-inspector" ? (
        <img
          className="h-[42em] rounded-3xl w-auto mr-6 sm:mr-0 md:mr-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] 
             dark:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)]
             transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)]
             hover:translate-x-[-5px] hover:translate-y-[-5px]"
          src={taxInspector}
          alt="Tax Inspector Picture"
        />
      ) : (
        <img
          className="h-[42em] rounded-3xl w-auto mr-6 sm:mr-0 md:mr-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)] 
             dark:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)]
             transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.5)]
             hover:translate-x-[-5px] hover:translate-y-[-5px]"
          src={defaultpic}
          alt="Picture"
        />
      )}
    </div>
  );
};

export default PictureLoader;
