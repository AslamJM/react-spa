import { useState, useEffect } from "react";

export default function FullPageLoader() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="mb-8">
        <svg
          className="w-24 h-24 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L1 21h22L12 2zm0 3.516L20.297 19H3.703L12 5.516zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
        </svg>
      </div>
      <div className="w-16 h-16 mb-8 border-t-4 border-white border-solid rounded-full animate-spin"></div>
      <h1 className="mb-4 text-3xl font-bold text-white">Welcome to Our App</h1>
      <p className="mb-2 text-xl text-white">
        Please wait while we set things up
      </p>
      <p className="font-mono text-lg text-white">{loadingText}</p>
    </div>
  );
}
