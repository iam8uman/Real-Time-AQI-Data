import React from "react";

const ProgressBar = ({ progress }: { progress: number }) => {
  const renderProgressBarItem = (step: number) => {
    const isActive = progress >= step;

    return (
      <div className="grid items-center" key={step}>
        <div className="flex">
          <div
            className={`w-12 h-12 font-bold  ${
              isActive ? "bg-green-500 text-white" : "bg-slate-300"
            } rounded-full flex items-center justify-center`}>
            {step}
          </div>
          {/* progress bar */}
          {step < 7 && (
            <div
              className={`w-12 mt-5 h-1 ${
                isActive ? "bg-green-500" : "bg-slate-300"
              }`}></div>
          )}
        </div>
        <div className="text">
          <div className="text-center relative right-7 text-xs break-words">
            Personal
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap items-center w-full justify-center py-3 bg-gray-50 border-2 border-green-500 rounded-md">
      {Array.from({ length: 7 }, (_, index) =>
        renderProgressBarItem(index + 1)
      )}
    </div>
  );
};

export default ProgressBar;