import { useState, useEffect } from "react";

const CountryDropdown = ({
  value,
  onChange,
  error,
  required = true,
  className = "",
  placeholder = "Select Country",
}) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/countries");

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        setCountries(data);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setFetchError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue || "");
  };

  return (
    <div className="w-full">
      <select
        value={value || ""}
        onChange={handleChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${
          loading ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } ${className}`}
        disabled={loading}
      >
        <option value="" disabled>
          {loading ? "Loading countries..." : placeholder}
        </option>
        {!loading &&
          !fetchError &&
          countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country_name}
            </option>
          ))}
      </select>

      {fetchError && <p className="mt-1 text-sm text-red-600">{fetchError}</p>}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CountryDropdown;
