import React, { useState } from "react";
import "./SendFeedback.css";
import FeedbackOptions from "./FeedbackOptions";
import Statistics from "./Statistics";
import Section from "./Section";

function App() {
  const [feedbackCounts, setFeedbackCounts] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    totalClicks: 0,
  });

  const handleButtonClick = (type) => {
    setFeedbackCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
      totalClicks: prevCounts.totalClicks + 1,
    }));
  };

  const handleResetClick = () => {
    setFeedbackCounts({
      good: 0,
      neutral: 0,
      bad: 0,
      totalClicks: 0,
    });
  };

  const { good, neutral, bad, totalClicks } = feedbackCounts;
  const positivePercentage = totalClicks > 0 ? Math.round((good / totalClicks) * 100) : 0;
  const options = ["good", "neutral", "bad"];

  return (
    <div className="form-container">
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleButtonClick} />
        {totalClicks > 0 && (
          <div className="reset-button">
            <button onClick={handleResetClick} className="reset">
              Reset Counts
            </button>
          </div>
        )}
      </Section>
      <Section title="Statistics">
        {totalClicks === 0 ? (
          <p className="hidden-statistics">There is no feedback</p>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalClicks={totalClicks}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}

export default App;
