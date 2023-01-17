import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
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
    ])
      .then((all) => {
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
      })
      .catch((err) => err.message);
  }, []);

  const updateSpots = (state, appointments) => {
    const currentDayIndex = state.days.findIndex(
      (day) => day.name === state.day
    );
    const currentDay = state.days[currentDayIndex];

    const spots = currentDay.appointments.filter(
      (appID) => !appointments[appID].interview
    ).length;

    const day = {
      ...currentDay,
      spots,
    };

    const days = [...state.days];
    days[currentDayIndex] = day;

    return days;
  };

  const bookInterview = (id, interview) => {
    console.log('bookInterview');
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
      .then(() => setState({ ...state, appointments, days }));
  };

  async function cancelInterview(id) {
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    console.log(`delete interview id: ${id}`);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    setState({ ...state, appointments, days });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
