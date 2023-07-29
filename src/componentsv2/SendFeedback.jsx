import React, { Component } from "react";
import "./SendFeedback.css";

class SendFeedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    totalClicks: 0,
    showStatistics: false,
  };

  handleButtonClick = (type, e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      [type]: prevState[type] + 1,
      totalClicks: prevState.totalClicks + 1,
      showStatistics: true,
    }));
  };

  handleResetClick = (e) => {
    e.preventDefault();

    this.setState({
      good: 0,
      neutral: 0,
      bad: 0,
      totalClicks: 0,
      showStatistics: false,
    });
  };

  render() {
    const { good, neutral, bad, totalClicks, showStatistics } = this.state;
    const goodPercentage = totalClicks > 0 ? Math.round((good / totalClicks) * 100) : 0;

    return (
      <div className="form-container">
        <h1>Please leave feedback</h1>
        <form>
          <button onClick={(e) => this.handleButtonClick("good", e)} className="good">
            Good
          </button>

          <button onClick={(e) => this.handleButtonClick("neutral", e)} className="neutral">
            Neutral
          </button>

          <button onClick={(e) => this.handleButtonClick("bad", e)} className="bad">
            Bad
          </button>
        </form>
        <div className="reset-button">
          <button onClick={this.handleResetClick} className="reset">
            Reset Counts
          </button>
        </div>
        {!showStatistics && ( 
          <p className="hidden-statistics">There is no feedback</p>
        )}
        {showStatistics && (
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
                <p>Total Clicks : {totalClicks}</p>
              </li>
              <li>
                <p>Good Percentage: {goodPercentage}%</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default SendFeedback;
