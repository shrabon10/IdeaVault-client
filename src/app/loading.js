import React from "react";
import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[20vh]">
      <MoonLoader />
    </div>
  );
};

export default LoadingPage;
