import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from 'reducers/application';

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // Get all state data from API and dispatch to reducer
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
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

    dispatch({ type: SET_INTERVIEW, appointments, days });
  };

  // Book, edit or cancel an interview.
  const editInterview = async (id, interviewData, cancel = false) => {
    const interview = cancel ? null : { ...interviewData };

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

    // Update spots remaining and pass info to be dispatched
    updateSpots(state, appointments);
  };

  return { state, setDay, editInterview };
}
