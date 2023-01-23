import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from 'reducers/application';

/**
 * Hook to initialize and manage the Applications data states.
 * @returns {{state: object, setDay: function, editInterview: function}}
 */
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
  });

  // Called in Application onClick() for DayListItem navigation
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // Get all state data from API and dispatch to reducer
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  /**
   * Update spots remaining and dispatch updated state data to reducer
   * @param {object} state        Current application state, managed by reducer
   * @param {object} appointments Updated appointments data
   */
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

  /**
   * Makes an Axios request to either PUT(edit/create) or DELETE an interview.
   * @param {number}      id            ID of appointment to edit.
   * @param {object|null} interviewData object to create or edit, null
   *                                    if deleting an interview.
   * @param {boolean}     cancel        boolean to cancel appointment or not.
   * @return {updateSpots()} Returns a call to dispatch data to reducer.
   */
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
      await axios.delete(`/api/appointments/${id}`);
    }

    if (!cancel) {
      await axios.put(
        `/api/appointments/${id}`,
        appointments[id]
      );
    }

    // Update spots remaining and pass info to be dispatched
    return updateSpots(state, appointments);
  };

  return { state, setDay, editInterview };
}
