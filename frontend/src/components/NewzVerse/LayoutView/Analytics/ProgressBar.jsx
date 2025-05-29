import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value }) => {
  if (!value) return null;

  const [neg, neu, pos] = value.split("|").map((v) => parseInt(v.trim(), 10));

  const total = neg + neu + pos || 1;

  const negPct = (neg / total) * 100;
  const neuPct = (neu / total) * 100;
  const posPct = (pos / total) * 100;

  return (
    <div className="sentiment-wrapper">
      <div className="sentiment-bar">
        <div
          className="segment segment-negative"
          style={{ width: `${negPct}%` }}
        />
        <div
          className="segment segment-neutral"
          style={{ width: `${neuPct}%` }}
        />
        <div
          className="segment segment-positive"
          style={{ width: `${posPct}%` }}
        />
      </div>
      <div className="sentiment-labels">
        <span className="label label-negative">{neg}%</span>
        <span className="label label-neutral">{neu}%</span>
        <span className="label label-positive">{pos}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
