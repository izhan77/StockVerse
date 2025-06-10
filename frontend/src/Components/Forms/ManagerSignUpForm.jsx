import { useState } from "react";
import { useLocation } from "react-router-dom";
import Submit from "../Buttons/Submit";

const ManagerSignUpForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    phone_number: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    phone_number: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });

  const { state } = useLocation();
  const role = state?.role;
  const nameRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/;
  const emailRegex =
    /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@(?:[a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
  const addressRegex = /^(?=.*[a-zA-ZÀ-ÿ])(?=.*\d)[a-zA-ZÀ-ÿ\d\s\-.,#]+$/;
  const postalCodeRegex = /^[0-9]{5}$/;
  const alphaOnlyRegex = /^[A-Za-zÀ-ÿ\s]+$/;

  const validateName = (value) => {
    if (!value.trim()) {
      return "First Name is required.";
    } else if (value.length > 30) {
      return "First Name cannot exceed 30 characters.";
    } else if (!nameRegex.test(value)) {
      return "Only letters and single spaces allowed.";
    } else {
      return "";
    }
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required.";
    } else if (!emailRegex.test(value)) {
      return "Invalid Email Pattern";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    } else if (!passwordRegex.test(value)) {
      return "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
    }
    return "";
  };

  const validateAge = (value) => {
    if (!value) return "Age is required";
    if (isNaN(value)) return "Age must be a number";
    if (value < 18) return "Must be at least 18 years old";
    if (value > 100) return "Age cannot exceed 100";
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!phoneRegex.test(value)) return "Invalid phone number format";
    return "";
  };

  const validateAddress = (value) => {
    if (!value.trim()) return "Address is required";
    if (!addressRegex.test(value))
      return "Address must contain both letters and numbers";
    if (value.length < 5) return "Address is too short";
    return "";
  };

  const validatePostalCode = (value) => {
    if (!value.trim()) return "Postal code is required";
    if (!postalCodeRegex.test(value)) return "Postal code must be 5 digits";
    return "";
  };

  const validateCity = (value) => {
    if (!value.trim()) return "City is required";
    if (!alphaOnlyRegex.test(value)) return "City can only contain letters";
    if (value.length < 2) return "City name is too short";
    return "";
  };

  const validateState = (value) => {
    if (!value.trim()) return "State is required";
    if (!alphaOnlyRegex.test(value)) return "State can only contain letters";
    return "";
  };

  const validateCountry = (value) => {
    if (!value.trim()) return "Country is required";
    if (!alphaOnlyRegex.test(value)) return "Country can only contain letters";
    return "";
  };

  const handleUser = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "firstName" || name === "lastName") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateName(value),
      }));
    } else if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateEmail(value),
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        [name]: validatePassword(value),
      }));
    } else if (name === "age") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateAge(value),
      }));
    } else if (name === "phone_number") {
      setErrors((prev) => ({
        ...prev,
        [name]: validatePhone(value),
      }));
    } else if (name === "address") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateAddress(value),
      }));
    } else if (name === "postal_code") {
      setErrors((prev) => ({
        ...prev,
        [name]: validatePostalCode(value),
      }));
    } else if (name === "city") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateCity(value),
      }));
    } else if (name === "state") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateState(value),
      }));
    } else if (name === "country") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateCountry(value),
      }));
    }
  };

  return (
    <form className="w-full md:w-[55%] flex flex-col gap-3 p-4 rounded-lg">
      {/* Heading */}
      <h2 className="text-4xl text-center md:text-left tracking-tighter sm:text-2xl font-bold text-gray-800 mb-3">
        {role === "manager"
          ? "Lead with Confidence"
          : "Complete Your Registration"}
      </h2>

      <div className="flex flex-col md:flex-col lg:flex-row gap-3">
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleUser}
            placeholder="First name"
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
          <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
            {errors.firstName}
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleUser}
            placeholder="Last name"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
          <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
            {errors.lastName}
          </p>
        </div>
      </div>

      {[
        { type: "email", name: "email", placeholder: "Email" },
        { type: "password", name: "password", placeholder: "Password" },
        { type: "number", name: "age", placeholder: "Age" },
        { type: "tel", name: "phone_number", placeholder: "Phone Number" },
        { type: "text", name: "address", placeholder: "Address" },
        { type: "text", name: "postal_code", placeholder: "Postal Code" },
        { type: "text", name: "city", placeholder: "City" },
        { type: "text", name: "state", placeholder: "State" },
        { type: "text", name: "country", placeholder: "Country" },
      ].map((field, index) => (
        <div key={index} className="flex-1 flex flex-col">
          <input
            name={field.name}
            value={user[field.name]}
            onChange={handleUser}
            type={field.type}
            placeholder={field.placeholder}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
          <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
            {errors[field.name]}
          </p>
        </div>
      ))}

      {/* Submit Button */}
      <Submit name="Submit" />
    </form>
  );
};

export default ManagerSignUpForm;
