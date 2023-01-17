import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

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

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
      .then(() => setState({ ...state, appointments }));
  };

  async function deleteInterview(id) {
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

    setState({ ...state, appointments });
  }

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

  return { state, setDay, bookInterview, deleteInterview };
}
