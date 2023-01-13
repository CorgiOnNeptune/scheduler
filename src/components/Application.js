import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'styles/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });
  const setDay = (day) => setState({ ...state, day });

  // Get days data from API and set the days state
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      console.log('↓ /api/days ↓');
      console.log(all[0]);
      console.log('↓ /api/appointments ↓');
      console.log(all[1]);
      console.log('↓ /api/interviewers ↓');
      console.log(all[2]);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  const dailyAppointments = [getAppointmentsForDay(state, state.day)][0];

  const appointmentItems = dailyAppointments.map((app) => {
    return <Appointment key={app.id} {...app} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItems}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
