import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Submit from "../Buttons/Submit";
import CountryDropdown from "../SignUp/CountryDropDown";

const EmployeeSignUpForm = ({ roleNumber }) => {
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
    country_id: "",
  });

  // Tracks validation errors
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
    country_id: "",
  });

  // Tracking submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Parsing data from SignUpPage via route
  const { state } = useLocation();
  const role = state?.role;
  const navigate = useNavigate();

  // Handling User Input
  const handleUser = (e) => {
    const { name, value } = e.target;

    if (submitError) {
      setSubmitError("");
    }

    // Updating user state with prev values
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validating fields before sending data to backend!!
    validateField(name, value);
  };

  // Special handler for country dropdown
  const handleCountryChange = (countryId) => {
    if (submitError) {
      setSubmitError("");
    }

    // Update validation to check for string IDs
    if (countryId && countryId !== "") {
      setErrors((prev) => ({
        ...prev,
        country_id: "",
      }));
    }

    setUser((prev) => ({
      ...prev,
      country_id: countryId,
    }));

    validateField("country_id", countryId);
  };

  // Validation function
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "firstName":
      case "lastName":
        const nameRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/;
        if (!value.trim()) {
          error = "First Name is required.";
        } else if (value.length > 30) {
          error = "First Name cannot exceed 30 characters.";
        } else if (!nameRegex.test(value)) {
          error = "Only letters and single spaces allowed.";
        }
        break;

      case "email":
        const emailRegex =
          /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@(?:[a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!emailRegex.test(value)) {
          error = "Invalid Email Pattern";
        }
        break;

      case "password":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!value.trim()) {
          error = "Password is required";
        } else if (!passwordRegex.test(value)) {
          error =
            "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
        }
        break;

      case "age":
        if (!value) {
          error = "Age is required";
        } else if (isNaN(value)) {
          error = "Age must be a number";
        } else if (value < 18) {
          error = "Must be at least 18 years old";
        } else if (value > 100) {
          error = "Age cannot exceed 100";
        }
        break;

      case "phone_number":
        const phoneRegex =
          /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          error = "Invalid phone number format";
        }
        break;

      case "address":
        const addressRegex = /^(?=.*[a-zA-ZÀ-ÿ])(?=.*\d)[a-zA-ZÀ-ÿ\d\s\-.,#]+$/;
        if (!value.trim()) {
          error = "Address is required";
        } else if (!addressRegex.test(value)) {
          error = "Address must contain both letters and numbers";
        } else if (value.length < 5) {
          error = "Address is too short";
        }
        break;

      case "postal_code":
        const postalCodeRegex = /^[0-9]{5}$/;
        if (!value.trim()) {
          error = "Postal code is required";
        } else if (!postalCodeRegex.test(value)) {
          error = "Postal code must be 5 digits";
        }
        break;

      case "city":
        const alphaOnlyRegex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!value.trim()) {
          error = "City is required";
        } else if (!alphaOnlyRegex.test(value)) {
          error = "City can only contain letters";
        } else if (value.length < 2) {
          error = "City name is too short";
        }
        break;

      case "state":
        const alphaOnlyRegex1 = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!value.trim()) {
          error = "State is required";
        } else if (!alphaOnlyRegex1.test(value)) {
          error = "State can only contain letters";
        }
        break;

      case "country_id":
        if (!value || value === "") {
          error = "Country is required";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const hasValidationErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const hasRequiredFields = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phone_number",
      "address",
      "postal_code",
      "city",
      "state",
      "country_id",
    ];
    return required.every((field) => {
      if (field === "country_id") {
        return user[field] && user[field] !== "";
      }
      return user[field] && user[field].toString().trim() !== "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission started!!!");

    setSubmitError("");

    if (hasValidationErrors()) {
      setSubmitError("Please fix all validation errors before submitting.");
      return;
    }

    if (!hasRequiredFields()) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        first_name: user.firstName.trim(),
        last_name: user.lastName.trim(),
        email: user.email.trim().toLowerCase(),
        password: user.password,
        salary: 0,
        phone_number: user.phone_number.trim(),
        address: user.address.trim(),
        postal_code: user.postal_code.trim(),
        city: user.city.trim(),
        state: user.state.trim(),
        country_id: user.country_id,
        role_id: roleNumber,
        store_id: null,
      };

      console.log("Sending userData:", userData);

      console.log("Sending request to http://localhost:5000/users");

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Received response status:", response.status);

      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        console.log(`Registration successful! Welcome ${userData.first_name}!`);

        setIsSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 3000);

        setUser({
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
          country_id: "",
        });

        setErrors({
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
          country_id: "",
        });
      } else {
        console.log("Registration Failed:", result.error);
        setSubmitError(
          result.error || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setSubmitError(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-full md:w-[55%] flex flex-col gap-3 p-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      <h2 className="text-4xl text-center md:text-left tracking-tighter sm:text-2xl font-bold text-gray-800 mb-3">
        {role === "employee"
          ? "Start Your Work Journey"
          : "Complete Your Registration"}
      </h2>

      {/* Submission Errrors Display */}
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 font-semibold px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}

      {/* Successive Registration Display */}
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 font-semibold py-3 rounded mb-4">
          Registration successful! Redirecting you to the homepage...
        </div>
      )}

      <div className="flex flex-col md:flex-col lg:flex-row gap-3">
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleUser}
            placeholder="First name"
            disabled={isSubmitting || isSuccess}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-100"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleUser}
            placeholder="Last name"
            disabled={isSubmitting || isSuccess}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-100"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
              {errors.lastName}
            </p>
          )}
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
      ].map((field, index) => (
        <div key={index} className="flex-1 flex flex-col">
          <input
            name={field.name}
            value={user[field.name]}
            onChange={handleUser}
            type={field.type}
            placeholder={field.placeholder}
            disabled={isSubmitting || isSuccess}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-100"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Country Dropdown - Replaced the input field */}
      <div className="flex-1 flex flex-col">
        <CountryDropdown
          value={user.country_id}
          onChange={handleCountryChange}
          error={errors.country_id}
          placeholder="Select Country"
          className={`p-2 rounded-md border ${
            errors.country_id
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          } transition-all ${
            isSubmitting || isSuccess ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          required={true}
        />
        {errors.country_id && (
          <p className="text-red-500 text-sm mt-1 min-h-[1rem]">
            {errors.country_id}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full"
      >
        <Submit
          name="Submit"
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
        />
      </button>
    </form>
  );
};

export default EmployeeSignUpForm;
