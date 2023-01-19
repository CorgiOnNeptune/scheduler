const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export { SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA };

export default function reducer(state, action) {
  const { type, day, days, appointments, interviewers } = action;

  switch (type) {
    case SET_DAY:
      return {
        ...state,
        day,
      };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days,
        appointments,
        interviewers,
      };

    case SET_INTERVIEW:
      return {
        ...state,
        appointments,
        days,
      };

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}.`);
  }
}
