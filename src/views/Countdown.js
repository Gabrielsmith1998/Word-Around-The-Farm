import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Countdown({ dates, user }) {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(`${dates.countdownDate}`).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <section className="time-container">
      <section className="timer">
        <div className="countdown-header">
          <h2>{dates.title}</h2>
          {user?.isAdmin ? (
            <Link
              to={`/edit-countdown/${dates.firebaseKey}`}
              className="btn btn-info"
            >
              <i className="far fa-edit" /> Edit
            </Link>
          ) : (
            ''
          )}
          {user?.isAdmin ? (
            <Link
              to="/createCountdown"
              className="btn btn-success"
            >
              <i className="far fa-edit" /> Create
            </Link>
          ) : (
            ''
          )}
          <div className="count-down-timer">
            <section>
              <p>{timerDays}</p>
              <p>
                <small>Days</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p>
                <small>Hours</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p>
                <small>Minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p>
                <small>Seconds</small>
              </p>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

Countdown.propTypes = {
  dates: PropTypes.shape(PropTypes.obj).isRequired,
  user: PropTypes.shape(PropTypes.obj),
};

Countdown.defaultProps = {
  user: null,
};
