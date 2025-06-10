const StockVerseLoader = ({ isVisible = true }) => {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
        rel="stylesheet"
      />

      <style jsx>{`
        :root {
          --loader-text-color: #f6e9fe;
          --loader-dot-color: #a51ff6;
          --loader-bg: #100319;
        }

        .loader-svg {
          width: 20rem;
          font-weight: 700;
          font-family: "Poppins", sans-serif;
        }

        .loader-svg text {
          font-size: 4rem;
          stroke-width: 2;
          letter-spacing: -5px;
        }

        .loader-svg text.text-body {
          stroke: var(--loader-text-color);
          animation: 4s infinite alternate animate-stroke;
        }

        .loader-svg text.dot {
          fill: var(--loader-dot-color);
          stroke-opacity: var(--loader-dot-color);
          animation: 4s infinite alternate animate-dot;
        }

        @keyframes animate-stroke {
          0% {
            fill: transparent;
            stroke: var(--loader-text-color);
            stroke-width: 3;
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 32%;
          }

          50% {
            fill: transparent;
            stroke: var(--loader-text-color);
            stroke-width: 3;
          }
          80%,
          100% {
            fill: var(--loader-text-color);
            stroke: transparent;
            stroke-width: 0;
            stroke-dashoffset: -25%;
            stroke-dasharray: 32% 0;
          }
        }

        @keyframes animate-dot {
          0%,
          60% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[999] grid place-content-center transition-all duration-1000 ease-in-out ${
          !isVisible
            ? "transform -translate-y-full opacity-100"
            : "transform translate-y-0 opacity-100"
        }`}
        style={{
          backgroundColor: "var(--loader-bg)",
        }}
      >
        <svg viewBox="0 0 400 160" className="loader-svg">
          <text
            x="50%"
            y="50%"
            dy=".32em"
            textAnchor="middle"
            className="text-body"
          >
            StockVerse
          </text>
          <text
            x="50%"
            y="50%"
            dy=".32em"
            dx="2.8em"
            textAnchor="middle"
            className="dot"
          >
            .
          </text>
        </svg>
      </div>
    </>
  );
};

export default StockVerseLoader;
