// App.js
import React, { Component } from "react";
import "./SendFeedback.css";
import FeedbackOptions from "./FeedbackOptions";
import Statistics from "./Statistics";
import Section from "./Section";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    totalClicks: 0,
  };

  handleButtonClick = (type) => {
    this.setState((prevState) => ({
      [type]: prevState[type] + 1,
      totalClicks: prevState.totalClicks + 1,
    }));
  };

  handleResetClick = () => {
    this.setState({
      good: 0,
      neutral: 0,
      bad: 0,
      totalClicks: 0,
    });
  };

  render() {
    const { good, neutral, bad, totalClicks } = this.state;
    const positivePercentage = totalClicks > 0 ? Math.round((good / totalClicks) * 100) : 0;
    const options = ["good", "neutral", "bad"];

    return (
      <div className="form-container">
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={this.handleButtonClick} />
          {totalClicks > 0 && (
            <div className="reset-button">
              <button onClick={this.handleResetClick} className="reset">
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
}

export default App;
