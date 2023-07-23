import React, { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    feedbacks: {
      Good: 0,
      Neutral: 0,
      Bad: 0,
    },
  };

  handleFeedback = (feedbackType) => {
    this.setState((prevState) => {
      const { feedbacks } = prevState;
      return {
        feedbacks: {
          ...feedbacks,
          [feedbackType]: feedbacks[feedbackType] + 1,
        },
      };
    });
  };

  totalFeedback = () => {
    const { feedbacks } = this.state;
    return feedbacks.Good + feedbacks.Neutral + feedbacks.Bad;
  };

  positivePercentage = () => {
    const totalFeedback = this.totalFeedback();
    const { Good } = this.state.feedbacks;
    if (totalFeedback === 0) {
      return 0;
    }
    return Math.round((Good / totalFeedback) * 100);
  };

  render() {
    const { feedbacks } = this.state;
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
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback !== 0 ? (
            <Statistics
              good={feedbacks.Good}
              neutral={feedbacks.Neutral}
              bad={feedbacks.Bad}
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

