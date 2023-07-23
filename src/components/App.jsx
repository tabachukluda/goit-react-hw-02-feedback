import React, { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = (feedbackType) => {
  if (feedbackType === 'Good') {
    this.setState((prevState) => ({
      good: prevState.good + 1,
    }));
  } else if (feedbackType === 'Neutral') {
    this.setState((prevState) => ({
      neutral: prevState.neutral + 1,
    }));
  } else if (feedbackType === 'Bad') {
    this.setState((prevState) => ({
      bad: prevState.bad + 1,
    }));
  }
};
  totalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

positivePercentage = () => {
    const totalFeedback = this.totalFeedback();
    if (totalFeedback === 0) {
      return 0;
    }
    return Math.round((this.state.good / totalFeedback) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.totalFeedback();

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['Good', 'Neutral', 'Bad']}
            onLeaveFeedback={this.handleFeedback}
          />{' '}
        </Section>

        <Section title="Statistics">
          {totalFeedback !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={this.positivePercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
