// Statistics.js
import React from "react";


const Statistics = ({ good, neutral, bad, totalClicks, positivePercentage }) => {
  return (
    <div className="statistics-container">
      <p className="statistics-title">Statistics</p>
      <ul>
        <li>
          <p>Good: {good}</p>
        </li>
        <li>
          <p>Neutral: {neutral}</p>
        </li>
        <li>
          <p>Bad: {bad}</p>
        </li>
        <li>
          <p>Total Clicks: {totalClicks}</p>
        </li>
        <li>
          <p>Good Percentage: {positivePercentage}%</p>
        </li>
      </ul>
    </div>
  );
};

export default Statistics;
