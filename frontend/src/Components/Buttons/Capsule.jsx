const Capsule = ({ title, total, name }) => {
  return (
    <div>
      <p
        className={`text-xs tracking-tighter font-semibold border border-gray-400 py-1 px-3 rounded-full ${
          title === "My Recent Activities" || "My Purchase Orders" ? "hidden" : "flex"
        }`}
      >
        {`${total} ${name}`}
      </p>
    </div>
  );
};

export default Capsule;
