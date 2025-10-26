import React from "react";
import { format, subDays } from "date-fns";
import clsx from "clsx";

const NewsletterOpenHeatmap = () => {
  const today = new Date();

  // Generate mock data for the last 30 days
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, 29 - i);
    return {
      date: format(date, "yyyy-MM-dd"),
      opens: Math.floor(Math.random() * 7), // 0–6
    };
  });

  // Dynamic color scale
  const getColor = (opens) => {
    if (opens === 0) return "bg-slate-200";
    if (opens <= 2) return "bg-blue-200";
    if (opens <= 4) return "bg-blue-400";
    return "bg-blue-600";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-slate-800">
          Newsletter Open Activity
        </h2>
        <span className="text-xs text-slate-500">Last 30 days</span>
      </div>

      {/* Compact Heatmap */}
      <div className="grid grid-cols-10 gap-1.5">
        {data.map((day) => (
          <div
            key={day.date}
            className={clsx(
              "w-5 h-5 sm:w-5 sm:h-5 rounded-sm transition-all duration-150 hover:scale-110 cursor-pointer group",
              getColor(day.opens)
            )}
            title={`${day.date} — ${day.opens} opens`}
          ></div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center mt-4 space-x-1 text-[11px] text-slate-500">
        <span>Less</span>
        {[0, 1, 3, 5].map((val) => (
          <div key={val} className={`w-3 h-3 rounded-sm ${getColor(val)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default NewsletterOpenHeatmap;
