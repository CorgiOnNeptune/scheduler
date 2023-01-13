import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'styles/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

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
      console.log(all[0].data);
      console.log('↓ /api/appointments ↓');
      console.log(all[1].data);
      console.log('↓ /api/interviewers ↓');
      console.log(all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  console.log(dailyAppointments);

  const appointmentItems = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);

    return <Appointment key={app.id} {...app} interview={interview} />;
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
