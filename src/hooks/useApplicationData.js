import { useEffect, useReducer } from 'react';
import axios from 'axios';

function reducer(state, action) {
  const { day, days, appointments, interviewers } = action;

  switch (action.type) {
    case 'SET_DAY':
      return {
        ...state,
        day,
      };

    case 'SET_APPLICATION_DATA':
      return {
        ...state,
        days,
        appointments,
        interviewers,
      };

    case 'SET_INTERVIEW':
      return {
        ...state,
        appointments,
        days,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}.`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = (day) => dispatch({ type: 'SET_DAY', day });

  // Get days data from API and set the days state
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
      .then((all) => {
        dispatch({
          type: 'SET_APPLICATION_DATA',
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
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

    const days = [...state.days];
    days[currentDayIndex] = { ...currentDay, spots };

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
      .then(() => dispatch({ type: 'SET_INTERVIEW', id, appointments, days }));
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

    dispatch({ type: 'SET_INTERVIEW', id, appointments, days });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
