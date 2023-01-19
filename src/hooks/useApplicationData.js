import { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  const { type, day, days, appointments, interviewers } = action;

  switch (type) {
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
      throw new Error(`Tried to reduce with unsupported action type: ${type}.`);
  }
};

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

  // Update spots remaining in the DayList
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

  // Book, edit or cancel an interview.
  const editInterview = async (id, interviewInfo, cancel = false) => {
    const interview = cancel ? null : { ...interviewInfo };

    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (cancel) {
      await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    }

    if (!cancel) {
      await axios.put(
        `http://localhost:8001/api/appointments/${id}`,
        appointments[id]
      );
    }

    const days = updateSpots(state, appointments, id);
    dispatch({ type: 'SET_INTERVIEW', id, appointments, days });
  };

  return { state, setDay, editInterview };
}
